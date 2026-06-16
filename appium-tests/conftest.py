import pytest
import csv
from pathlib import Path

@pytest.fixture(scope='session')
def testcases():
    path = Path(__file__).parents[1] / 'testcases_appium.csv'
    if not path.exists():
        return []
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)
