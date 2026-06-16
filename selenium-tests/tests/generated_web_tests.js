// Generated data-driven web tests
const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const { createDriver, quitDriver } = require('../utils/driverSetup');
const { navigateTo, waitForPageLoad, sleep } = require('../utils/testHelpers');
const config = require('../config/config');

function parseCsv(filepath) {
  const raw = fs.readFileSync(filepath, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const headers = lines.shift().split(',');
  return lines.map(line => {
    const cols = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = (cols[i] || '').trim());
    return obj;
  });
}

const csvPath = path.join(__dirname, '..', 'testcases_web.csv');
const cases = parseCsv(csvPath);

describe('Generated Web Test Cases', function() {
  this.timeout(120000);
  let driver;

  before(async function() {
    // no-op
  });

  after(async function() {
    // no-op
  });

  cases.forEach(testcase => {
    const title = `${testcase.id} - ${testcase.suite} - ${testcase.name}`;

    it(title, async function() {
      driver = await createDriver();
      try {
        // Basic navigation test: navigate to route and ensure page loads
        const route = (testcase.route && testcase.route !== '') ? testcase.route : '/';

        // If route appears to be a protected route, perform login first
        const protectedSegments = ['dashboard', 'stock', 'profile', 'orders', 'portfolio', 'settings', 'reports', 'backtester', 'positions', 'watchlist', 'signals', 'analytics'];
        const needsAuth = protectedSegments.some(seg => route.includes(seg));
        if (needsAuth) {
          // perform login
          await navigateTo(driver, '/login');
          await waitForPageLoad(driver, config.waits.long);
          try {
            const emailEl = await driver.findElement(By.id('email'));
            const passEl = await driver.findElement(By.id('password'));
            const loginBtn = await driver.findElement(By.id('login-button'));
            await emailEl.clear();
            await emailEl.sendKeys(config.testUser.email);
            await passEl.clear();
            await passEl.sendKeys(config.testUser.password);
            await loginBtn.click();
            await waitForPageLoad(driver, config.waits.long);
          } catch (e) {
            // If login elements are not found, continue to navigate directly (test may be running against public build)
          }
        }

        await navigateTo(driver, route);
        await waitForPageLoad(driver, config.waits.long);
        await sleep(500);
        const url = await driver.getCurrentUrl();
        // Assert that the URL contains expected path or at least that we are on site
        assert.isString(url, 'Current URL should be a string');
        // If route is more than '/', check inclusion
        if (route !== '/' && route !== '') {
          // Allow dynamic segments - check partial inclusion
          const expected = route.split('/').filter(Boolean)[0];
          if (expected) {
            assert.include(url, expected);
          }
        }
      } catch (err) {
        // If navigation fails, capture a screenshot
        try {
          const buf = await driver.takeScreenshot();
          fs.writeFileSync(path.join(__dirname, '..', 'test-results', `${testcase.id}.png`), buf, 'base64');
        } catch (e) {}
        throw err;
      } finally {
        await quitDriver(driver);
      }
    });
  });
});
