// Test Utilities
const { By, until, WebDriver } = require('selenium-webdriver');
const config = require('../config/config');

/**
 * Find element by ID
 */
async function findById(driver, id) {
  await driver.wait(until.elementLocated(By.id(id)), config.waits.medium);
  return driver.findElement(By.id(id));
}

/**
 * Find element by CSS selector
 */
async function findBySelector(driver, selector) {
  await driver.wait(until.elementLocated(By.css(selector)), config.waits.medium);
  return driver.findElement(By.css(selector));
}

/**
 * Find element by XPath
 */
async function findByXPath(driver, xpath) {
  await driver.wait(until.elementLocated(By.xpath(xpath)), config.waits.medium);
  return driver.findElement(By.xpath(xpath));
}

/**
 * Wait for element to be clickable
 */
async function waitForClickable(driver, locator, timeout = config.waits.medium) {
  await driver.wait(until.elementLocated(locator), timeout);
  const element = driver.findElement(locator);
  await driver.wait(until.elementIsEnabled(element), timeout);
  return element;
}

/**
 * Click element with retry
 */
async function clickElement(driver, locator) {
  for (let i = 0; i < config.retry.count; i++) {
    try {
      const element = await waitForClickable(driver, locator);
      await element.click();
      return;
    } catch (error) {
      if (i === config.retry.count - 1) throw error;
      await driver.sleep(config.retry.delay);
    }
  }
}

/**
 * Type text into element
 */
async function typeText(driver, locator, text) {
  const element = await findByLocator(driver, locator);
  await element.clear();
  await element.sendKeys(text);
}

/**
 * Get element text
 */
async function getText(driver, locator) {
  const element = await findByLocator(driver, locator);
  return element.getText();
}

/**
 * Find element by any locator
 */
async function findByLocator(driver, locator) {
  if (typeof locator === 'string' && locator.startsWith('#')) {
    return findById(driver, locator.substring(1));
  } else if (locator instanceof By) {
    await driver.wait(until.elementLocated(locator), config.waits.medium);
    return driver.findElement(locator);
  }
  return locator;
}

/**
 * Navigate to URL
 */
async function navigateTo(driver, path = '') {
  const url = config.baseUrl + path;
  await driver.get(url);
}

/**
 * Wait for page load
 */
async function waitForPageLoad(driver, timeout = config.waits.medium) {
  try {
    await driver.wait(async () => {
      const readyState = await driver.executeScript('return document.readyState');
      return readyState === 'complete';
    }, timeout);
  } catch (error) {
    // Page might already be loaded, continue
    console.warn('Page load timeout, continuing...');
  }
  
  // Additional wait for app to stabilize
  await sleep(500);
}

/**
 * Close all windows except first
 */
async function closeOtherWindows(driver) {
  const handles = await driver.getAllWindowHandles();
  for (let i = 1; i < handles.length; i++) {
    await driver.switchTo().window(handles[i]);
    await driver.close();
  }
  await driver.switchTo().window(handles[0]);
}

/**
 * Sleep
 */
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  findById,
  findBySelector,
  findByXPath,
  waitForClickable,
  clickElement,
  typeText,
  getText,
  findByLocator,
  navigateTo,
  waitForPageLoad,
  closeOtherWindows,
  sleep,
  By,
  until
};
