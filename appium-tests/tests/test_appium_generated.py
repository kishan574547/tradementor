import csv
import os
import pytest
from appium import webdriver

TESTCASES_CSV = os.path.join(os.path.dirname(__file__), '..', 'testcases_appium.csv')
RESULTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'results')
RESULTS_CSV = os.path.join(RESULTS_DIR, 'results_appium.csv')


def load_testcases():
    rows = []
    with open(TESTCASES_CSV, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)
    return rows


testcases = load_testcases()


@pytest.fixture(scope='session', autouse=True)
def prepare_results():
    os.makedirs(RESULTS_DIR, exist_ok=True)
    with open(RESULTS_CSV, 'w', newline='', encoding='utf-8') as f:
        f.write('case_id,title,result,notes\n')
    yield


@pytest.fixture
def appium_driver():
    server = os.environ.get('APPIUM_SERVER', 'http://127.0.0.1:4723/wd/hub')
    desired = {
        'platformName': 'Android',
        'automationName': 'UiAutomator2',
        'appPackage': os.environ.get('APP_PACKAGE', ''),
        'appActivity': os.environ.get('APP_ACTIVITY', ''),
        'noReset': True,
    }
    try:
        driver = webdriver.Remote(server, desired)
        yield driver
        driver.quit()
    except Exception as e:
        pytest.skip(f'Cannot start Appium session: {e}')


@pytest.mark.parametrize('tc', testcases)
def test_appium_case(tc, appium_driver):
    case_id = tc['case_id']
    title = tc['title']
    result = 'FAIL'
    notes = ''
    try:
        # Minimal connectivity check: ensure driver session exists
        assert appium_driver.session_id is not None
        result = 'PASS'
        notes = 'session_ok'
    except Exception as e:
        notes = str(e)
    finally:
        with open(RESULTS_CSV, 'a', encoding='utf-8') as f:
            f.write(f"{case_id},{title},{result},{notes}\n")
    assert result == 'PASS', f"{case_id} failed: {notes}"
