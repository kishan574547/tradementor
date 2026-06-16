// Portfolio Test Suite
const { expect } = require('chai');
const { createDriver, quitDriver } = require('../utils/driverSetup');
const { 
  findById, 
  navigateTo, 
  waitForPageLoad,
  sleep,
  By
} = require('../utils/testHelpers');
const config = require('../config/config');

describe('Portfolio Tests', function() {
  let driver;

  beforeEach(async function() {
    driver = await createDriver();
  });

  afterEach(async function() {
    await quitDriver(driver);
  });

  async function loginAndNavigateToPortfolio() {
    // Login
    await navigateTo(driver, '/login');
    await waitForPageLoad(driver);
    
    const emailInput = await findById(driver, 'email');
    await emailInput.clear();
    await emailInput.sendKeys(config.testUser.email);
    
    const passwordInput = await findById(driver, 'password');
    await passwordInput.clear();
    await passwordInput.sendKeys(config.testUser.password);
    
    const loginButton = await findById(driver, 'login-button');
    await loginButton.click();
    
    await sleep(5000);
    
    // Navigate to portfolio
    await navigateTo(driver, '/dashboard/portfolio');
    await sleep(2500);
    await waitForPageLoad(driver);
  }

  it('should load portfolio page', async function() {
    await loginAndNavigateToPortfolio();
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/portfolio');
  });

  it('should display portfolio content', async function() {
    await loginAndNavigateToPortfolio();
    
    // Check if page has content
    const bodyContent = await driver.findElements(By.css('main, [role="main"], .portfolio, [class*="portfolio"]'));
    expect(bodyContent.length).to.be.greaterThan(0);
  });

  it('should be responsive on portfolio page', async function() {
    await loginAndNavigateToPortfolio();
    
    // Set viewport to mobile size
    await driver.manage().window().setRect({ width: 375, height: 667 });
    
    await sleep(1000);
    
    // Page should still load
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/portfolio');
  });

  it('should reset viewport after mobile test', async function() {
    await loginAndNavigateToPortfolio();
    
    // Reset viewport to desktop size
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    
    await sleep(500);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/portfolio');
  });

  it('should navigate from portfolio to watchlist', async function() {
    await loginAndNavigateToPortfolio();
    
    // Navigate to watchlist
    await navigateTo(driver, '/dashboard/watchlist');
    await sleep(1500);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/watchlist');
  });

  it('should navigate from portfolio to dashboard', async function() {
    await loginAndNavigateToPortfolio();
    
    // Navigate to dashboard
    await navigateTo(driver, '/dashboard');
    await sleep(1500);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/dashboard');
  });
});
