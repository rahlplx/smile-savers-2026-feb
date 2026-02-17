"""
Skill Registry - Discovery and Management
"""

import json
from pathlib import Path
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from datetime import datetime
import logging

logger = logging.getLogger('skills.registry')


@dataclass
class SkillInfo:
    """Information about a skill."""
    id: str
    name: str
    category: str
    description: str
    path: Path
    peer_skills: List[str] = field(default_factory=list)
    dependencies: List[str] = field(default_factory=list)
    confidence: float = 0.5
    has_scripts: bool = False


class SkillRegistry:
    """Registry for all skills with discovery and matching."""
    
    def __init__(self, skills_path: str = "./skills", manifest_path: Optional[str] = None):
        self.skills_path = Path(skills_path)
        self.manifest_path = Path(manifest_path or self.skills_path / "skill-manifest.json")
        self.skills: Dict[str, SkillInfo] = {}
        self.trigger_matrix: Dict[str, Dict] = {}
        self._load_manifest()
        logger.info(f"Registry initialized with {len(self.skills)} skills")
    
    def _load_manifest(self):
        """Load skill manifest."""
        if self.manifest_path.exists():
            with open(self.manifest_path) as f:
                manifest = json.load(f)
            
            # Load skills
            for skill_id, skill_def in manifest.get('skills', {}).items():
                self.skills[skill_id] = SkillInfo(
                    id=skill_id,
                    name=skill_def.get('name', skill_id),
                    category=skill_def.get('category', 'unknown'),
                    description=skill_def.get('description', ''),
                    path=self.skills_path / skill_id.replace('-', '_'),
                    peer_skills=skill_def.get('peerSkills', []),
                    dependencies=skill_def.get('dependencies', []),
                    confidence=skill_def.get('confidence', 0.5),
                    has_scripts=skill_def.get('hasScripts', False)
                )
            
            # Load trigger matrix
            self.trigger_matrix = manifest.get('triggerMatrix', {})
    
    def get_skill(self, skill_id: str) -> Optional[SkillInfo]:
        """Get skill by ID."""
        return self.skills.get(skill_id)
    
    def get_peer_skills(self, skill_id: str) -> List[str]:
        """Get peer skills for a skill."""
        skill = self.get_skill(skill_id)
        return skill.peer_skills if skill else []
    
    def match_trigger(self, context: str, task: str) -> List[Dict]:
        """Match context against trigger matrix."""
        combined = f"{context} {task}".lower()
        matches = []
        
        for trigger_name, trigger_def in self.trigger_matrix.items():
            trigger_keywords = trigger_name.split('_')
            if any(kw in combined for kw in trigger_keywords):
                primary = trigger_def.get('primary')
                if primary and primary in self.skills:
                    matches.append({
                        'skill_id': primary,
                        'trigger': trigger_name,
                        'confidence': self.skills[primary].confidence
                    })
        
        matches.sort(key=lambda x: x['confidence'], reverse=True)
        return matches[:5]
    
    def resolve_dependencies(self, skill_id: str) -> List[str]:
        """Resolve dependencies in order."""
        visited = set()
        result = []
        
        def visit(sid: str):
            if sid in visited:
                return
            visited.add(sid)
            skill = self.get_skill(sid)
            if skill:
                for dep in skill.dependencies:
                    visit(dep)
            result.append(sid)
        
        visit(skill_id)
        return result


# Singleton
_registry: Optional[SkillRegistry] = None


def get_registry(skills_path: Optional[str] = None, manifest_path: Optional[str] = None) -> SkillRegistry:
    """Get global registry instance."""
    global _registry
    if _registry is None:
        from .config import get_config
        config = get_config()
        _registry = SkillRegistry(
            skills_path or config.skills_path,
            manifest_path or config.manifest_path
        )
    return _registry
