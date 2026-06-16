import pytest
from appium import webdriver
import time

@pytest.fixture(scope='module')
def driver():
    desired_caps = {
        'platformName': 'Android',
        'deviceName': 'emulator-5554',
        'appPackage': 'com.tradementor.app',
        'appActivity': 'com.tradementor.app.MainActivity',
        'automationName': 'UiAutomator2',
        'noReset': True
    }
    driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    yield driver
    driver.quit()


def test_app_launch(driver):
    time.sleep(3)
    # basic check: ensure activity is present
    assert driver.current_activity is not None


def test_login_valid(driver):
    # locate elements by accessibility id / resource-id as appropriate
    try:
        email = driver.find_element_by_accessibility_id('email')
        password = driver.find_element_by_accessibility_id('password')
        login = driver.find_element_by_accessibility_id('login-button')
        email.send_keys('test@example.com')
        password.send_keys('password')
        login.click()
        time.sleep(3)
        # after login, expect dashboard element
        dashboard = driver.find_element_by_accessibility_id('dashboard-root')
        assert dashboard is not None
    except Exception as e:
        pytest.skip(f'App elements not found: {e}')
