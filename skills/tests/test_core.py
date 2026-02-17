"""
Test Suite for Enterprise RAG System Core Modules

Run: python skills/tests/test_core.py
"""

import sys
import os
import unittest
import tempfile
import shutil
from pathlib import Path

# Add skills to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.cache import SkillCache, CacheType, get_cache
from core.config import SkillsConfig, get_config
from core.registry import SkillRegistry, get_registry


class TestConfig(unittest.TestCase):
    """Test configuration management."""
    
    def test_default_config(self):
        """Test default configuration values."""
        config = SkillsConfig()
        self.assertTrue(config.cache_enabled)
        self.assertEqual(config.gemini_daily_limit, 1500)
        self.assertEqual(config.target_cost_per_1k, 0.00)
        self.assertEqual(config.target_cache_hit_rate, 0.90)
    
    def test_config_to_dict(self):
        """Test config serialization."""
        config = SkillsConfig()
        data = config.to_dict()
        self.assertIn('cache_path', data)
        self.assertIn('skills_path', data)


class TestCache(unittest.TestCase):
    """Test SQLite caching system."""
    
    def setUp(self):
        """Create temp directory for tests."""
        self.temp_dir = tempfile.mkdtemp()
        self.cache_path = os.path.join(self.temp_dir, 'test_cache.db')
        self.cache = SkillCache(self.cache_path)
    
    def tearDown(self):
        """Cleanup temp directory."""
        shutil.rmtree(self.temp_dir)
    
    def test_set_and_get(self):
        """Test basic set/get operations."""
        self.cache.set('test_key', {'value': 'test_data'})
        result = self.cache.get('test_key')
        self.assertEqual(result['value'], 'test_data')
    
    def test_missing_key(self):
        """Test getting missing key returns default."""
        result = self.cache.get('missing_key', default='default_value')
        self.assertEqual(result, 'default_value')
    
    def test_cache_types(self):
        """Test different cache types."""
        self.cache.set('pattern_key', 'pattern_data', cache_type='pattern')
        self.cache.set('exec_key', 'exec_data', cache_type=CacheType.EXECUTION)
        
        self.assertEqual(self.cache.get('pattern_key'), 'pattern_data')
        self.assertEqual(self.cache.get('exec_key'), 'exec_data')
    
    def test_delete(self):
        """Test delete operation."""
        self.cache.set('delete_me', 'value')
        self.assertTrue(self.cache.delete('delete_me'))
        self.assertIsNone(self.cache.get('delete_me'))
    
    def test_stats(self):
        """Test statistics."""
        self.cache.set('stat_key', 'stat_value')
        stats = self.cache.get_stats()
        self.assertEqual(stats['total_entries'], 1)


class TestRegistry(unittest.TestCase):
    """Test skill registry."""
    
    def setUp(self):
        """Initialize registry."""
        self.skills_path = Path(__file__).parent.parent
        self.registry = SkillRegistry(
            str(self.skills_path),
            str(self.skills_path / 'skill-manifest.json')
        )
    
    def test_registry_loads_skills(self):
        """Test that registry loads skills from manifest."""
        self.assertGreater(len(self.registry.skills), 0)
    
    def test_get_skill(self):
        """Test getting a skill by ID."""
        skill = self.registry.get_skill('LLM')
        self.assertIsNotNone(skill)
    
    def test_trigger_matching(self):
        """Test trigger matching."""
        matches = self.registry.match_trigger('Fix lint error', 'react')
        self.assertGreater(len(matches), 0)


def run_tests():
    """Run all tests."""
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    suite.addTests(loader.loadTestsFromTestCase(TestConfig))
    suite.addTests(loader.loadTestsFromTestCase(TestCache))
    suite.addTests(loader.loadTestsFromTestCase(TestRegistry))
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    return result.wasSuccessful()


if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)
