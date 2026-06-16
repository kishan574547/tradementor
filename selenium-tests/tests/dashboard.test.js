// Dashboard Test Suite
const { expect } = require('chai');
const { createDriver, quitDriver } = require('../utils/driverSetup');
const { 
  findById, 
  findBySelector,
  navigateTo, 
  waitForPageLoad,
  sleep,
  By
} = require('../utils/testHelpers');
const config = require('../config/config');

describe('Dashboard Tests', function() {
  let driver;

  beforeEach(async function() {
    driver = await createDriver();
  });

  afterEach(async function() {
    await quitDriver(driver);
  });

  async function loginUser() {
    // Navigate to login
    await navigateTo(driver, '/login');
    await waitForPageLoad(driver);
    
    // Enter credentials
    const emailInput = await findById(driver, 'email');
    await emailInput.clear();
    await emailInput.sendKeys(config.testUser.email);
    
    const passwordInput = await findById(driver, 'password');
    await passwordInput.clear();
    await passwordInput.sendKeys(config.testUser.password);
    
    // Click login
    const loginButton = await findById(driver, 'login-button');
    await loginButton.click();
    
    // Wait for redirect with longer timeout
    await sleep(5000);
    await waitForPageLoad(driver);
  }

  it('should load dashboard after login', async function() {
    await loginUser();
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/dashboard');
  });

  it('should display dashboard header', async function() {
    await loginUser();
    
    // Look for dashboard layout components
    const sidebar = await driver.findElements(By.css('[class*="sidebar"], [class*="Sidebar"]'));
    expect(sidebar.length).to.be.greaterThan(0);
  });

  it('should have navigation menu', async function() {
    await loginUser();
    
    // Check for common navigation items
    const navElements = await driver.findElements(By.css('nav, [role="navigation"]'));
    expect(navElements.length).to.be.greaterThan(0);
  });

  it('should be able to access portfolio page', async function() {
    await loginUser();
    
    // Try to navigate to portfolio
    await navigateTo(driver, '/dashboard/portfolio');
    await sleep(1500);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/portfolio');
  });

  it('should be able to access watchlist page', async function() {
    await loginUser();
    
    // Try to navigate to watchlist
    await navigateTo(driver, '/dashboard/watchlist');
    await sleep(1500);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/watchlist');
  });

  it('should be able to access profile page', async function() {
    await loginUser();
    
    // Try to navigate to profile
    await navigateTo(driver, '/dashboard/profile');
    await sleep(1500);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/profile');
  });

  it('should persist user session', async function() {
    await loginUser();
    
    // Navigate to a different page
    await navigateTo(driver, '/dashboard/watchlist');
    await sleep(1500);
    
    // Navigate back to dashboard
    await navigateTo(driver, '/dashboard');
    await sleep(1500);
    
    // Should still be on dashboard (not redirected to login)
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/dashboard');
  });
});
