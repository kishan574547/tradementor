// WebDriver Setup
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const config = require('../config/config');

/**
 * Create Chrome driver
 */
function createChromeDriver() {
  let options = new chrome.Options();
  
  if (config.browser.headless) {
    options.addArguments('--headless=new');
  }
  
  options.addArguments(...config.browser.args);
  
  return new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

/**
 * Create Firefox driver
 */
function createFirefoxDriver() {
  let options = new firefox.Options();
  
  if (config.browser.headless) {
    options.addArguments('--headless');
  }
  
  return new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
}

/**
 * Create WebDriver based on config
 */
async function createDriver() {
  let driver;
  
  switch (config.browser.type.toLowerCase()) {
    case 'firefox':
      driver = createFirefoxDriver();
      break;
    case 'chrome':
    default:
      driver = createChromeDriver();
      break;
  }
  
  // Set implicit wait with longer timeout
  await driver.manage().setTimeouts({ 
    implicit: 8000,
    pageLoad: 30000,
    script: 30000
  });
  
  return driver;
}

/**
 * Quit driver safely
 */
async function quitDriver(driver) {
  if (driver) {
    try {
      await driver.quit();
    } catch (error) {
      console.error('Error quitting driver:', error);
    }
  }
}

module.exports = {
  createDriver,
  quitDriver,
  createChromeDriver,
  createFirefoxDriver
};
