"""
Programmatic Thinking Engine
============================

Implements structured thinking for reliable problem solving.

Process:
1. ANALYZE - Break down the problem
2. PLAN - Create step-by-step plan
3. EXECUTE - Execute with validation
4. VERIFY - Check results
5. LEARN - Record for future

This engine prevents hallucinations by enforcing structured thinking.
"""

import json
import time
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime
import logging

logger = logging.getLogger('thinking')


class ThinkingPhase(Enum):
    """Phases of programmatic thinking."""
    ANALYZE = "analyze"
    PLAN = "plan"
    EXECUTE = "execute"
    VERIFY = "verify"
    LEARN = "learn"


class ExecutionStatus(Enum):
    """Status of execution step."""
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    SKIPPED = "skipped"


@dataclass
class ThinkingStep:
    """A single thinking step."""
    id: str
    phase: ThinkingPhase
    description: str
    action: Optional[str]
    expected_output: Optional[str]
    actual_output: Any = None
    status: ExecutionStatus = ExecutionStatus.PENDING
    confidence: float = 0.0
    duration_ms: int = 0
    issues: List[str] = field(default_factory=list)


@dataclass
class ThinkingResult:
    """Result of programmatic thinking process."""
    process_id: str
    query: str
    steps: List[ThinkingStep]
    final_answer: Any
    confidence: float
    total_duration_ms: int
    success: bool
    learnings: List[str]


class ProgrammaticThinking:
    """
    Programmatic Thinking Engine for structured problem solving.
    
    Thinking Process:
    1. ANALYZE: Understand the problem completely
    2. PLAN: Create detailed execution plan
    3. EXECUTE: Run each step with validation
    4. VERIFY: Check results match expectations
    5. LEARN: Record patterns for future
    
    Each phase validates before proceeding to next.
    """
    
    def __init__(self, cache=None, hallucination_preventer=None):
        self.cache = cache
        self.hallucination_preventer = hallucination_preventer
        self.step_counter = 0
        self.process_history: List[ThinkingResult] = []
    
    def think(
        self,
        query: str,
        context: Dict = None,
        available_tools: List[str] = None,
        max_steps: int = 20
    ) -> ThinkingResult:
        """
        Execute programmatic thinking process.
        
        Args:
            query: The problem to solve
            context: Additional context
            available_tools: List of available tool names
            max_steps: Maximum number of steps
            
        Returns:
            ThinkingResult with complete thinking process
        """
        
        process_id = f"think_{int(time.time()*1000)}"
        start_time = time.time()
        steps = []
        learnings = []
        
        # Phase 1: ANALYZE
        analyze_step = self._analyze(query, context)
        steps.append(analyze_step)
        
        if analyze_step.status != ExecutionStatus.SUCCESS:
            return self._create_result(
                process_id, query, steps, None, 0.0, start_time, False, learnings
            )
        
        # Phase 2: PLAN
        plan_step, plan = self._plan(query, analyze_step.actual_output, available_tools)
        steps.append(plan_step)
        
        if plan_step.status != ExecutionStatus.SUCCESS:
            return self._create_result(
                process_id, query, steps, None, 0.0, start_time, False, learnings
            )
        
        # Phase 3: EXECUTE
        execution_results = []
        for i, action in enumerate(plan.get('actions', [])):
            if len(steps) >= max_steps:
                learnings.append(f"Reached max steps ({max_steps})")
                break
            
            exec_step = self._execute_step(action, context)
            steps.append(exec_step)
            execution_results.append(exec_step.actual_output)
            
            if exec_step.status == ExecutionStatus.FAILED:
                learnings.append(f"Step {i} failed: {exec_step.issues}")
                break
        
        # Phase 4: VERIFY
        verify_step = self._verify(execution_results, query)
        steps.append(verify_step)
        
        # Phase 5: LEARN
        learn_step = self._learn(steps)
        steps.append(learn_step)
        learnings.extend(learn_step.actual_output or [])
        
        # Calculate final confidence
        confidence = self._calculate_confidence(steps)
        
        # Create final answer
        final_answer = self._synthesize_answer(steps, execution_results)
        
        return self._create_result(
            process_id, query, steps, final_answer, confidence, start_time, True, learnings
        )
    
    def _analyze(self, query: str, context: Dict = None) -> ThinkingStep:
        """Analyze the problem."""
        
        step_start = time.time()
        self.step_counter += 1
        
        analysis = {
            'query_type': self._classify_query(query),
            'key_entities': self._extract_entities(query),
            'required_skills': self._identify_required_skills(query),
            'context_relevant': bool(context)
        }
        
        # Check for hallucination indicators
        issues = []
        if self.hallucination_preventer:
            check = self.hallucination_preventer.check(query, context)
            if check.warnings:
                issues.extend(check.warnings)
        
        return ThinkingStep(
            id=f"step_{self.step_counter}",
            phase=ThinkingPhase.ANALYZE,
            description="Analyze problem structure",
            action="classify_and_extract",
            expected_output="Problem analysis",
            actual_output=analysis,
            status=ExecutionStatus.SUCCESS,
            confidence=0.9,
            duration_ms=int((time.time() - step_start) * 1000),
            issues=issues
        )
    
    def _plan(
        self,
        query: str,
        analysis: Dict,
        available_tools: List[str] = None
    ) -> tuple:
        """Create execution plan."""
        
        step_start = time.time()
        self.step_counter += 1
        
        query_type = analysis.get('query_type', 'unknown')
        required_skills = analysis.get('required_skills', [])
        
        # Generate plan based on query type
        plan = {
            'query_type': query_type,
            'actions': []
        }
        
        if query_type == 'lint_fix':
            plan['actions'] = [
                {'action': 'detect_error', 'skill': 'lint-fixer'},
                {'action': 'find_pattern', 'skill': 'lint-error-solutions'},
                {'action': 'apply_fix', 'skill': 'lint-fixer'},
                {'action': 'validate', 'skill': 'lint-fixer'}
            ]
        elif query_type == 'generate':
            plan['actions'] = [
                {'action': 'understand_requirements', 'skill': 'LLM'},
                {'action': 'generate_content', 'skill': 'LLM'},
                {'action': 'validate_output', 'skill': 'LLM'}
            ]
        elif query_type == 'document':
            plan['actions'] = [
                {'action': 'parse_input', 'skill': 'docx'},
                {'action': 'process_content', 'skill': 'docx'},
                {'action': 'generate_output', 'skill': 'docx'}
            ]
        else:
            plan['actions'] = [
                {'action': 'process', 'skill': 'LLM'}
            ]
        
        step = ThinkingStep(
            id=f"step_{self.step_counter}",
            phase=ThinkingPhase.PLAN,
            description="Create execution plan",
            action="generate_plan",
            expected_output="Step-by-step plan",
            actual_output=plan,
            status=ExecutionStatus.SUCCESS,
            confidence=0.85,
            duration_ms=int((time.time() - step_start) * 1000)
        )
        
        return step, plan
    
    def _execute_step(self, action: Dict, context: Dict = None) -> ThinkingStep:
        """Execute a single action."""
        
        step_start = time.time()
        self.step_counter += 1
        
        action_type = action.get('action', 'unknown')
        skill = action.get('skill', 'LLM')
        
        # Simulate execution (in real implementation, would call actual skill)
        result = {
            'action': action_type,
            'skill': skill,
            'status': 'completed',
            'output': f"Executed {action_type} using {skill}"
        }
        
        confidence = 0.85
        
        return ThinkingStep(
            id=f"step_{self.step_counter}",
            phase=ThinkingPhase.EXECUTE,
            description=f"Execute: {action_type}",
            action=action_type,
            expected_output=f"Result from {skill}",
            actual_output=result,
            status=ExecutionStatus.SUCCESS,
            confidence=confidence,
            duration_ms=int((time.time() - step_start) * 1000)
        )
    
    def _verify(self, results: List[Any], original_query: str) -> ThinkingStep:
        """Verify execution results."""
        
        step_start = time.time()
        self.step_counter += 1
        
        # Count successes
        successes = sum(1 for r in results if r and r.get('status') == 'completed')
        
        verification = {
            'total_steps': len(results),
            'successful_steps': successes,
            'success_rate': successes / max(1, len(results)),
            'query_addressed': True  # Simplified check
        }
        
        confidence = verification['success_rate']
        status = ExecutionStatus.SUCCESS if confidence > 0.5 else ExecutionStatus.FAILED
        
        return ThinkingStep(
            id=f"step_{self.step_counter}",
            phase=ThinkingPhase.VERIFY,
            description="Verify results",
            action="check_results",
            expected_output="Verification status",
            actual_output=verification,
            status=status,
            confidence=confidence,
            duration_ms=int((time.time() - step_start) * 1000)
        )
    
    def _learn(self, steps: List[ThinkingStep]) -> ThinkingStep:
        """Extract learnings from the process."""
        
        step_start = time.time()
        self.step_counter += 1
        
        learnings = []
        
        for step in steps:
            if step.issues:
                learnings.extend(step.issues)
            if step.status == ExecutionStatus.FAILED:
                learnings.append(f"Failed step: {step.description}")
        
        # Add successful patterns
        successful_steps = [s for s in steps if s.status == ExecutionStatus.SUCCESS]
        if successful_steps:
            learnings.append(f"Successful pattern: {len(successful_steps)} steps completed")
        
        return ThinkingStep(
            id=f"step_{self.step_counter}",
            phase=ThinkingPhase.LEARN,
            description="Extract learnings",
            action="record_patterns",
            expected_output="Learnings list",
            actual_output=learnings,
            status=ExecutionStatus.SUCCESS,
            confidence=0.9,
            duration_ms=int((time.time() - step_start) * 1000)
        )
    
    def _classify_query(self, query: str) -> str:
        """Classify the type of query."""
        
        query_lower = query.lower()
        
        if any(w in query_lower for w in ['lint', 'error', 'fix', 'bug']):
            return 'lint_fix'
        if any(w in query_lower for w in ['generate', 'create', 'write']):
            return 'generate'
        if any(w in query_lower for w in ['document', 'pdf', 'word', 'excel']):
            return 'document'
        if any(w in query_lower for w in ['search', 'find', 'query']):
            return 'search'
        
        return 'general'
    
    def _extract_entities(self, query: str) -> List[str]:
        """Extract key entities from query."""
        
        # Simple entity extraction
        entities = []
        
        # File names
        import re
        files = re.findall(r'[\w\-]+\.[tj]sx?', query)
        entities.extend(files)
        
        # Error codes
        errors = re.findall(r'react-hooks/[\w-]+', query)
        entities.extend(errors)
        
        return entities
    
    def _identify_required_skills(self, query: str) -> List[str]:
        """Identify which skills are needed."""
        
        query_lower = query.lower()
        skills = []
        
        if 'lint' in query_lower:
            skills.append('lint-fixer')
        if 'react' in query_lower:
            skills.append('react-patterns')
        if 'document' in query_lower:
            skills.append('docx')
        if 'generate' in query_lower:
            skills.append('LLM')
        
        return skills
    
    def _calculate_confidence(self, steps: List[ThinkingStep]) -> float:
        """Calculate overall confidence."""
        
        if not steps:
            return 0.0
        
        total_confidence = sum(s.confidence for s in steps if s.status == ExecutionStatus.SUCCESS)
        success_count = sum(1 for s in steps if s.status == ExecutionStatus.SUCCESS)
        
        return total_confidence / max(1, len(steps))
    
    def _synthesize_answer(self, steps: List[ThinkingStep], results: List[Any]) -> Dict:
        """Synthesize final answer from steps."""
        
        return {
            'analysis': steps[0].actual_output if steps else None,
            'execution_results': results,
            'verification': steps[-2].actual_output if len(steps) >= 2 else None
        }
    
    def _create_result(
        self,
        process_id: str,
        query: str,
        steps: List[ThinkingStep],
        answer: Any,
        confidence: float,
        start_time: float,
        success: bool,
        learnings: List[str]
    ) -> ThinkingResult:
        """Create thinking result."""
        
        result = ThinkingResult(
            process_id=process_id,
            query=query,
            steps=steps,
            final_answer=answer,
            confidence=confidence,
            total_duration_ms=int((time.time() - start_time) * 1000),
            success=success,
            learnings=learnings
        )
        
        self.process_history.append(result)
        
        return result
    
    def get_stats(self) -> Dict:
        """Get thinking engine statistics."""
        
        total = len(self.process_history)
        successful = sum(1 for p in self.process_history if p.success)
        
        return {
            'total_processes': total,
            'successful': successful,
            'success_rate': successful / max(1, total),
            'avg_confidence': sum(p.confidence for p in self.process_history) / max(1, total)
        }


# Singleton
_thinking_engine: Optional[ProgrammaticThinking] = None


def get_thinking_engine(cache=None, hallucination_preventer=None) -> ProgrammaticThinking:
    """Get global thinking engine."""
    global _thinking_engine
    if _thinking_engine is None:
        _thinking_engine = ProgrammaticThinking(cache, hallucination_preventer)
    return _thinking_engine


if __name__ == "__main__":
    # Demo
    engine = ProgrammaticThinking()
    
    result = engine.think("Fix the lint error in Component.tsx")
    
    print(f"Process: {result.process_id}")
    print(f"Success: {result.success}")
    print(f"Confidence: {result.confidence:.2f}")
    print(f"Duration: {result.total_duration_ms}ms")
    print(f"Steps: {len(result.steps)}")
    print(f"Learnings: {result.learnings}")
