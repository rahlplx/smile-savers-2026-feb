"""
Tool Calling Validation Layer
=============================

Validates and manages tool calls to prevent errors and ensure reliability.

Features:
1. Tool Registry
2. Parameter Validation
3. Execution Tracking
4. Error Recovery
5. Result Caching
"""

import json
import time
import hashlib
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime
import logging
import re

logger = logging.getLogger('tools')


class ToolStatus(Enum):
    """Status of tool execution."""
    VALID = "valid"
    INVALID = "invalid"
    PENDING = "pending"
    EXECUTING = "executing"
    SUCCESS = "success"
    FAILED = "failed"
    CACHED = "cached"


@dataclass
class ToolDefinition:
    """Definition of a tool."""
    name: str
    description: str
    parameters: Dict
    required_params: List[str]
    returns: str
    examples: List[Dict] = field(default_factory=list)


@dataclass
class ToolCall:
    """A tool call request."""
    call_id: str
    tool_name: str
    parameters: Dict
    status: ToolStatus
    validation_errors: List[str]
    result: Any = None
    duration_ms: int = 0
    cache_hit: bool = False


@dataclass
class ValidationResult:
    """Result of parameter validation."""
    is_valid: bool
    errors: List[str]
    warnings: List[str]
    sanitized_params: Dict


class ToolValidator:
    """
    Validates tool calls and parameters.
    
    Validation Rules:
    1. Required parameters present
    2. Type checking
    3. Value constraints
    4. Security checks
    """
    
    # Known tools with their schemas
    TOOLS: Dict[str, ToolDefinition] = {
        'get_pattern': ToolDefinition(
            name='get_pattern',
            description='Retrieve a code pattern by ID',
            parameters={
                'pattern_id': {'type': 'string', 'description': 'Pattern identifier'}
            },
            required_params=['pattern_id'],
            returns='Pattern object with code and confidence',
            examples=[{'pattern_id': 'lazy_init'}]
        ),
        'execute_skill': ToolDefinition(
            name='execute_skill',
            description='Execute a skill with context',
            parameters={
                'skill_id': {'type': 'string', 'description': 'Skill to execute'},
                'context': {'type': 'object', 'description': 'Execution context'}
            },
            required_params=['skill_id'],
            returns='Execution result'
        ),
        'cache_get': ToolDefinition(
            name='cache_get',
            description='Get value from cache',
            parameters={
                'key': {'type': 'string', 'description': 'Cache key'}
            },
            required_params=['key'],
            returns='Cached value or None'
        ),
        'cache_set': ToolDefinition(
            name='cache_set',
            description='Set value in cache',
            parameters={
                'key': {'type': 'string', 'description': 'Cache key'},
                'value': {'type': 'any', 'description': 'Value to cache'},
                'ttl': {'type': 'integer', 'description': 'Time to live in seconds'}
            },
            required_params=['key', 'value'],
            returns='Boolean success'
        ),
        'peer_request': ToolDefinition(
            name='peer_request',
            description='Send request to peer skill',
            parameters={
                'from_skill': {'type': 'string'},
                'to_skill': {'type': 'string'},
                'request_type': {'type': 'string'},
                'payload': {'type': 'object'}
            },
            required_params=['from_skill', 'to_skill', 'request_type'],
            returns='Response from peer'
        )
    }
    
    def __init__(self, cache=None):
        self.cache = cache
        self.call_history: List[ToolCall] = []
        self.call_counter = 0
    
    def register_tool(self, definition: ToolDefinition):
        """Register a new tool."""
        self.TOOLS[definition.name] = definition
    
    def validate(self, tool_name: str, parameters: Dict) -> ValidationResult:
        """
        Validate tool call parameters.
        
        Args:
            tool_name: Name of tool to call
            parameters: Parameters to validate
            
        Returns:
            ValidationResult with errors and sanitized params
        """
        
        errors = []
        warnings = []
        sanitized = {}
        
        # Check tool exists
        if tool_name not in self.TOOLS:
            errors.append(f"Unknown tool: {tool_name}")
            return ValidationResult(
                is_valid=False,
                errors=errors,
                warnings=warnings,
                sanitized_params={}
            )
        
        tool = self.TOOLS[tool_name]
        
        # Check required parameters
        for param in tool.required_params:
            if param not in parameters:
                errors.append(f"Missing required parameter: {param}")
            elif parameters[param] is None:
                errors.append(f"Parameter {param} cannot be None")
        
        # Validate parameter types
        for param, value in parameters.items():
            if param in tool.parameters:
                expected_type = tool.parameters[param].get('type')
                
                # Type checking
                if expected_type and expected_type != 'any':
                    if not self._check_type(value, expected_type):
                        errors.append(
                            f"Parameter {param} has wrong type. "
                            f"Expected {expected_type}, got {type(value).__name__}"
                        )
                
                # Security checks
                security_issues = self._security_check(param, value)
                if security_issues:
                    warnings.extend(security_issues)
                
                sanitized[param] = value
            else:
                warnings.append(f"Unknown parameter: {param}")
        
        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors,
            warnings=warnings,
            sanitized_params=sanitized
        )
    
    def _check_type(self, value: Any, expected: str) -> bool:
        """Check if value matches expected type."""
        
        type_map = {
            'string': str,
            'integer': int,
            'number': (int, float),
            'boolean': bool,
            'object': dict,
            'array': list
        }
        
        if expected == 'any':
            return True
        
        expected_type = type_map.get(expected)
        if expected_type is None:
            return True  # Unknown type, assume valid
        
        return isinstance(value, expected_type)
    
    def _security_check(self, param: str, value: Any) -> List[str]:
        """Check for security issues."""
        
        issues = []
        
        if isinstance(value, str):
            # Check for injection patterns
            patterns = [
                (r'<script', 'Potential XSS'),
                (r'javascript:', 'Potential XSS'),
                (r'DROP TABLE', 'Potential SQL injection'),
                (r';--', 'Potential SQL injection'),
                (r'\.\./', 'Path traversal'),
            ]
            
            for pattern, warning in patterns:
                if re.search(pattern, str(value), re.IGNORECASE):
                    issues.append(f"{warning} detected in {param}")
        
        return issues
    
    def create_call(
        self,
        tool_name: str,
        parameters: Dict
    ) -> ToolCall:
        """Create and validate a tool call."""
        
        self.call_counter += 1
        call_id = f"call_{int(time.time()*1000)}_{self.call_counter}"
        
        validation = self.validate(tool_name, parameters)
        
        call = ToolCall(
            call_id=call_id,
            tool_name=tool_name,
            parameters=validation.sanitized_params,
            status=ToolStatus.VALID if validation.is_valid else ToolStatus.INVALID,
            validation_errors=validation.errors
        )
        
        self.call_history.append(call)
        
        return call
    
    def execute(
        self,
        call: ToolCall,
        executor: Optional[Callable] = None
    ) -> ToolCall:
        """
        Execute a validated tool call.
        
        Args:
            call: The tool call to execute
            executor: Optional custom executor function
            
        Returns:
            Updated ToolCall with results
        """
        
        if call.status == ToolStatus.INVALID:
            return call
        
        start_time = time.time()
        call.status = ToolStatus.EXECUTING
        
        try:
            # Check cache first
            if self.cache:
                cache_key = self._cache_key(call.tool_name, call.parameters)
                cached = self.cache.get(cache_key)
                if cached is not None:
                    call.result = cached
                    call.status = ToolStatus.CACHED
                    call.cache_hit = True
                    call.duration_ms = int((time.time() - start_time) * 1000)
                    return call
            
            # Execute
            if executor:
                result = executor(call.tool_name, call.parameters)
            else:
                result = self._default_executor(call.tool_name, call.parameters)
            
            call.result = result
            call.status = ToolStatus.SUCCESS
            
            # Cache result
            if self.cache and result:
                cache_key = self._cache_key(call.tool_name, call.parameters)
                self.cache.set(cache_key, result, ttl=3600)
        
        except Exception as e:
            call.status = ToolStatus.FAILED
            call.validation_errors.append(str(e))
            call.result = None
        
        call.duration_ms = int((time.time() - start_time) * 1000)
        return call
    
    def _default_executor(self, tool_name: str, parameters: Dict) -> Any:
        """Default executor for built-in tools."""
        
        if tool_name == 'cache_get':
            if self.cache:
                return self.cache.get(parameters.get('key'))
            return None
        
        if tool_name == 'cache_set':
            if self.cache:
                return self.cache.set(
                    parameters.get('key'),
                    parameters.get('value'),
                    ttl=parameters.get('ttl')
                )
            return False
        
        if tool_name == 'get_pattern':
            # Would integrate with pattern store
            return {'pattern': parameters.get('pattern_id'), 'found': False}
        
        return None
    
    def _cache_key(self, tool_name: str, parameters: Dict) -> str:
        """Generate cache key for tool call."""
        
        key_data = f"{tool_name}:{json.dumps(parameters, sort_keys=True)}"
        return hashlib.sha256(key_data.encode()).hexdigest()[:16]
    
    def get_stats(self) -> Dict:
        """Get tool calling statistics."""
        
        total = len(self.call_history)
        successful = sum(1 for c in self.call_history if c.status == ToolStatus.SUCCESS)
        cached = sum(1 for c in self.call_history if c.status == ToolStatus.CACHED)
        failed = sum(1 for c in self.call_history if c.status == ToolStatus.FAILED)
        
        return {
            'total_calls': total,
            'successful': successful,
            'cached': cached,
            'failed': failed,
            'success_rate': successful / max(1, total - cached),
            'cache_hit_rate': cached / max(1, total),
            'tools_available': len(self.TOOLS)
        }


# Singleton
_tool_validator: Optional[ToolValidator] = None


def get_tool_validator(cache=None) -> ToolValidator:
    """Get global tool validator."""
    global _tool_validator
    if _tool_validator is None:
        _tool_validator = ToolValidator(cache=cache)
    return _tool_validator


if __name__ == "__main__":
    # Demo
    validator = ToolValidator()
    
    # Valid call
    call = validator.create_call('get_pattern', {'pattern_id': 'lazy_init'})
    print(f"Valid call: {call.status.value}")
    
    # Invalid call (missing required param)
    bad_call = validator.create_call('get_pattern', {})
    print(f"Invalid call: {bad_call.status.value}, errors: {bad_call.validation_errors}")
    
    print(f"\nStats: {validator.get_stats()}")
