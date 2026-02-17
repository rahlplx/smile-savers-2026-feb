"""
Hallucination Prevention Layer
==============================

Detects and prevents hallucinations in AI outputs.

Strategies:
1. Confidence Thresholding
2. Source Attribution
3. Fact Verification
4. Pattern Matching Against Known Good
5. Cross-Validation with Peer Skills
"""

import json
import re
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
import logging

logger = logging.getLogger('hallucination')


class ConfidenceLevel(Enum):
    """Confidence levels for outputs."""
    HIGH = "high"        # > 0.85
    MEDIUM = "medium"    # 0.60 - 0.85
    LOW = "low"          # 0.40 - 0.60
    UNCERTAIN = "uncertain"  # < 0.40


@dataclass
class HallucinationCheck:
    """Result of hallucination check."""
    is_hallucination: bool
    confidence: float
    level: ConfidenceLevel
    issues: List[str]
    warnings: List[str]
    suggestions: List[str]
    verified_facts: List[str]
    uncertain_claims: List[str]


@dataclass
class FactVerification:
    """A verified or unverified fact."""
    claim: str
    is_verified: bool
    source: Optional[str]
    confidence: float
    evidence: List[str]


class HallucinationPreventer:
    """
    Prevents hallucinations in AI outputs.
    
    Detection Methods:
    1. Uncertainty Language Detection
    2. Unverifiable Claim Detection
    3. Confidence Score Analysis
    4. Pattern Mismatch Detection
    5. Source Attribution Check
    """
    
    # Patterns that indicate uncertainty/hallucination
    UNCERTAINTY_PATTERNS = [
        r'\bI think\b',
        r'\bI believe\b',
        r'\bprobably\b',
        r'\bmaybe\b',
        r'\bmight be\b',
        r'\bcould be\b',
        r'\bI guess\b',
        r'\bnot sure\b',
        r'\bpossibly\b',
        r'\bperhaps\b',
        r'\bseems like\b',
        r'\bappears to\b',
        r'\bI assume\b',
        r'\bI suppose\b',
        r'\broughly\b',
        r'\bapproximately\b',
        r'\bsomewhere around\b',
    ]
    
    # Patterns that indicate factual claims
    FACTUAL_PATTERNS = [
        r'\b(is|are|was|were|has|have|had)\b.*\b(called|known as|defined as)\b',
        r'\baccording to\b',
        r'\bresearch shows\b',
        r'\bstudies indicate\b',
        r'\bdata suggests\b',
        r'\bdocumented\b',
        r'\bverified\b',
        r'\bproven\b',
    ]
    
    # Known good patterns (from our patterns database)
    KNOWN_PATTERNS = {
        'lazy_init': {
            'code': 'useState(() => value)',
            'confidence': 0.95,
            'verified': True
        },
        'mounted_state': {
            'code': 'const [mounted, setMounted] = useState(false)',
            'confidence': 0.88,
            'verified': True
        },
        'next_image': {
            'code': 'import Image from "next/image"',
            'confidence': 0.95,
            'verified': True
        }
    }
    
    def __init__(self, cache=None):
        self.cache = cache
        self.verification_history: List[FactVerification] = []
    
    def check(self, output: str, context: Dict = None) -> HallucinationCheck:
        """
        Check output for hallucinations.
        
        Args:
            output: The AI output to check
            context: Optional context for verification
            
        Returns:
            HallucinationCheck with results
        """
        issues = []
        warnings = []
        suggestions = []
        uncertain_claims = []
        verified_facts = []
        
        # 1. Check for uncertainty language
        uncertainty_matches = self._check_uncertainty(output)
        if uncertainty_matches:
            uncertain_claims.extend(uncertainty_matches)
            warnings.append(f"Uncertainty detected: {len(uncertainty_matches)} phrases")
        
        # 2. Check for factual claims
        factual_matches = self._check_factual_claims(output)
        for claim in factual_matches:
            # Try to verify against known patterns
            verified = self._verify_against_known(claim, context)
            if verified:
                verified_facts.append(claim)
            else:
                uncertain_claims.append(claim)
        
        # 3. Check confidence indicators
        confidence = self._calculate_confidence(
            output, 
            uncertainty_matches, 
            factual_matches
        )
        
        # 4. Check against known good patterns
        pattern_match = self._check_known_patterns(output)
        if pattern_match:
            confidence = max(confidence, pattern_match['confidence'])
            verified_facts.append(f"Pattern match: {pattern_match['code']}")
        
        # 5. Determine if hallucination
        is_hallucination = confidence < 0.40 or len(issues) > 3
        
        # 6. Generate suggestions
        if confidence < 0.60:
            suggestions.append("Consider adding source attribution")
        if uncertain_claims:
            suggestions.append("Verify uncertain claims before presenting")
        
        # Determine level
        if confidence > 0.85:
            level = ConfidenceLevel.HIGH
        elif confidence > 0.60:
            level = ConfidenceLevel.MEDIUM
        elif confidence > 0.40:
            level = ConfidenceLevel.LOW
        else:
            level = ConfidenceLevel.UNCERTAIN
        
        return HallucinationCheck(
            is_hallucination=is_hallucination,
            confidence=confidence,
            level=level,
            issues=issues,
            warnings=warnings,
            suggestions=suggestions,
            verified_facts=verified_facts,
            uncertain_claims=uncertain_claims
        )
    
    def _check_uncertainty(self, text: str) -> List[str]:
        """Find uncertainty patterns in text."""
        matches = []
        for pattern in self.UNCERTAINTY_PATTERNS:
            found = re.findall(pattern, text, re.IGNORECASE)
            matches.extend(found)
        return matches
    
    def _check_factual_claims(self, text: str) -> List[str]:
        """Find factual claims in text."""
        matches = []
        for pattern in self.FACTUAL_PATTERNS:
            found = re.findall(pattern, text, re.IGNORECASE)
            matches.extend([' '.join(f) if isinstance(f, tuple) else f for f in found])
        return matches
    
    def _verify_against_known(self, claim: str, context: Dict = None) -> bool:
        """Verify claim against known patterns."""
        claim_lower = claim.lower()
        
        for pattern_id, pattern in self.KNOWN_PATTERNS.items():
            if pattern['code'].lower() in claim_lower:
                return True
            if pattern_id.replace('_', ' ') in claim_lower:
                return True
        
        return False
    
    def _calculate_confidence(
        self,
        text: str,
        uncertainty_matches: List[str],
        factual_matches: List[str]
    ) -> float:
        """Calculate overall confidence score."""
        
        base_confidence = 0.80
        
        # Reduce for uncertainty
        uncertainty_penalty = len(uncertainty_matches) * 0.10
        
        # Increase for verified facts
        fact_bonus = len(factual_matches) * 0.05
        
        # Check for code blocks (higher confidence)
        code_bonus = 0.10 if '```' in text or 'useState' in text else 0
        
        confidence = base_confidence - uncertainty_penalty + fact_bonus + code_bonus
        
        return max(0, min(1, confidence))
    
    def _check_known_patterns(self, text: str) -> Optional[Dict]:
        """Check if text matches known good patterns."""
        for pattern_id, pattern in self.KNOWN_PATTERNS.items():
            if pattern['code'] in text:
                return pattern
        return None
    
    def verify_fact(
        self,
        claim: str,
        sources: List[str] = None,
        context: Dict = None
    ) -> FactVerification:
        """Verify a single fact."""
        
        is_verified = False
        evidence = []
        source = None
        
        # Check against known patterns
        for pattern_id, pattern in self.KNOWN_PATTERNS.items():
            if pattern['code'] in claim or pattern_id.replace('_', ' ') in claim.lower():
                is_verified = True
                source = f"known_pattern:{pattern_id}"
                evidence.append(f"Matches verified pattern: {pattern['code']}")
                break
        
        # Check against sources if provided
        if sources and not is_verified:
            for src in sources:
                if src.lower() in claim.lower():
                    is_verified = True
                    source = src
                    evidence.append(f"Found in source: {src}")
                    break
        
        confidence = 0.95 if is_verified else 0.30
        
        verification = FactVerification(
            claim=claim,
            is_verified=is_verified,
            source=source,
            confidence=confidence,
            evidence=evidence
        )
        
        self.verification_history.append(verification)
        return verification
    
    def add_known_pattern(
        self,
        pattern_id: str,
        code: str,
        confidence: float,
        verified: bool = True
    ):
        """Add a new known good pattern."""
        self.KNOWN_PATTERNS[pattern_id] = {
            'code': code,
            'confidence': confidence,
            'verified': verified
        }
    
    def get_stats(self) -> Dict:
        """Get hallucination prevention statistics."""
        
        total = len(self.verification_history)
        verified = sum(1 for v in self.verification_history if v.is_verified)
        
        return {
            'total_checks': total,
            'verified': verified,
            'verification_rate': verified / max(1, total),
            'known_patterns': len(self.KNOWN_PATTERNS)
        }


# Singleton
_hallucination_preventer: Optional[HallucinationPreventer] = None


def get_hallucination_preventer(cache=None) -> HallucinationPreventer:
    """Get global hallucination preventer."""
    global _hallucination_preventer
    if _hallucination_preventer is None:
        _hallucination_preventer = HallucinationPreventer(cache=cache)
    return _hallucination_preventer


if __name__ == "__main__":
    # Demo
    hp = HallucinationPreventer()
    
    # Check a good output
    good = hp.check("""
    To fix the ESLint error, use lazy initialization:
    const [value, setValue] = useState(() => initialValue);
    """)
    print(f"Good output: confidence={good.confidence:.2f}, level={good.level.value}")
    
    # Check uncertain output
    uncertain = hp.check("""
    I think the solution might be to use useState differently.
    Perhaps you could try lazy initialization.
    """)
    print(f"Uncertain output: confidence={uncertain.confidence:.2f}, level={uncertain.level.value}")
    print(f"Uncertain claims: {uncertain.uncertain_claims}")
    
    print(f"\nStats: {hp.get_stats()}")
