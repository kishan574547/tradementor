# TradeMentor Selenium E2E Testing

Comprehensive end-to-end testing suite for the TradeMentor application using Selenium WebDriver and Mocha.

## Project Structure

```
selenium-tests/
├── config/
│   └── config.js           # Test configuration and settings
├── utils/
│   ├── driverSetup.js      # WebDriver initialization
│   └── testHelpers.js      # Common test utilities and helpers
├── tests/
│   ├── login.test.js       # Login functionality tests
│   ├── dashboard.test.js   # Dashboard navigation tests
│   └── portfolio.test.js   # Portfolio page tests
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Chrome browser (for Chrome tests)
- Firefox browser (for Firefox tests - optional)
- ChromeDriver or GeckoDriver installed

## Installation

1. Navigate to the selenium-tests directory:
```bash
cd selenium-tests
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Edit `config/config.js` to customize test settings:

```javascript
// Base URL
baseUrl: 'http://localhost:3000'

// API URL
apiUrl: 'http://localhost:4000'

// Browser type: 'chrome' or 'firefox'
browser.type: 'chrome'

// Headless mode: true (background) or false (visible)
browser.headless: true

// Test user credentials
testUser.email: 'demo@tradementor.com'
testUser.password: 'User@123456'
```

### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Application URLs
BASE_URL=http://localhost:3000
API_URL=http://localhost:4000

# Browser settings
BROWSER=chrome
HEADLESS=true

# Test credentials
TEST_EMAIL=demo@tradementor.com
TEST_PASSWORD=User@123456
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test suites:
```bash
# Login tests only
npm run test:login

# Dashboard tests only
npm run test:dashboard

# Portfolio tests only
npm run test:portfolio
```

### Run with watch mode:
```bash
npm run test:watch
```

### Run tests in headless mode (visible browser):
Edit `config/config.js` and set `headless: false`

## Test Suites

### 1. Login Tests (`tests/login.test.js`)
Tests the user authentication functionality:
- ✅ Load login page successfully
- ✅ Login with valid credentials
- ✅ Display error with invalid credentials
- ✅ Pre-filled demo credentials
- ✅ Navigation to register page
- ✅ Email field validation
- ✅ Password field validation

**Expected Results:**
- Valid credentials should redirect to `/dashboard`
- Invalid credentials should show error or stay on `/login`
- All form fields should be present and functional

### 2. Dashboard Tests (`tests/dashboard.test.js`)
Tests dashboard navigation and authentication:
- ✅ Load dashboard after login
- ✅ Display dashboard header
- ✅ Navigation menu presence
- ✅ Access portfolio page
- ✅ Access watchlist page
- ✅ Access profile page
- ✅ User session persistence

**Expected Results:**
- Authenticated users can access dashboard pages
- Navigation between pages works correctly
- User session is maintained across pages

### 3. Portfolio Tests (`tests/portfolio.test.js`)
Tests portfolio page functionality:
- ✅ Load portfolio page
- ✅ Display portfolio content
- ✅ Responsive design (mobile viewport)
- ✅ Viewport reset to desktop
- ✅ Navigation to watchlist
- ✅ Navigation to dashboard

**Expected Results:**
- Portfolio page loads after authentication
- Content is displayed correctly
- Responsive design works on different viewport sizes

## Test Automation

### GitHub Actions Workflow

Create `.github/workflows/selenium-tests.yml`:

```yaml
name: Selenium E2E Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      backend:
        image: node:18
        options: --health-cmd "npm run dev" --health-interval 10s --health-timeout 5s --health-retries 5
        ports:
          - 4000:4000

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install frontend dependencies
      run: npm install --legacy-peer-deps
      working-directory: frontend
    
    - name: Start frontend
      run: npm run dev &
      working-directory: frontend
    
    - name: Install backend dependencies
      run: npm install
      working-directory: backend
    
    - name: Start backend
      run: npm run dev &
      working-directory: backend
    
    - name: Wait for services
      run: sleep 10
    
    - name: Install test dependencies
      run: npm install
      working-directory: selenium-tests
    
    - name: Run Selenium tests
      run: npm test
      working-directory: selenium-tests
```

## Debugging Tests

### View browser during test execution:
1. Edit `config/config.js`
2. Set `headless: false`
3. Run tests

### Add debug output:
```javascript
console.log('Current URL:', await driver.getCurrentUrl());
console.log('Page title:', await driver.getTitle());
```

### Take screenshots:
```javascript
const screenshot = await driver.takeScreenshot();
require('fs').writeFileSync('screenshot.png', screenshot, 'base64');
```

## Adding Test IDs to Components

For Selenium to reliably find elements, add stable `id` attributes:

```tsx
// Login form
<form id="login-form">
  <input id="email" type="email" />
  <input id="password" type="password" />
  <button id="login-button">Sign In</button>
</form>

// Dashboard elements
<div id="sidebar"></div>
<div id="main-content"></div>
<a id="portfolio-link" href="/dashboard/portfolio">Portfolio</a>
```

## Common Issues & Solutions

### Issue: "WebDriverError: chrome not reachable"
**Solution:** 
- Make sure Chrome is installed
- Update ChromeDriver to match Chrome version
- Check if port 9222 is available

### Issue: "TimeoutError: element not found"
**Solution:**
- Increase wait timeout in `config/config.js`
- Check if element ID exists in HTML
- Verify page is loaded: `await waitForPageLoad(driver)`

### Issue: "ERESOLVE unable to resolve dependency"
**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue: Tests pass locally but fail in CI/CD
**Solution:**
- Increase waits in CI environment
- Use headless browser
- Check service startup timing
- Verify environment variables

## Best Practices

1. **Use stable IDs**: Add `id` attributes to elements instead of relying on class selectors
2. **Use explicit waits**: Always wait for elements before interacting
3. **Clear data**: Log out after each test to ensure clean state
4. **Meaningful assertions**: Use descriptive error messages
5. **Retry logic**: Built into `clickElement()` and other helpers
6. **Sleep between actions**: Use `sleep()` for page transitions

## Contributing Tests

When adding new test files:

1. Create file in `tests/` directory with `.test.js` extension
2. Use existing test structure as template
3. Include `beforeEach` and `afterEach` hooks
4. Add meaningful test descriptions
5. Use helper functions from `utils/testHelpers.js`
6. Document expected behavior

### Example:
```javascript
const { expect } = require('chai');
const { createDriver, quitDriver } = require('../utils/driverSetup');

describe('New Feature Tests', function() {
  let driver;

  beforeEach(async function() {
    driver = await createDriver();
  });

  afterEach(async function() {
    await quitDriver(driver);
  });

  it('should test new feature', async function() {
    // Test implementation
  });
});
```

## Performance Metrics

Test execution times (average):
- Login tests: ~15-20 seconds
- Dashboard tests: ~25-30 seconds
- Portfolio tests: ~20-25 seconds
- Full suite: ~2-3 minutes

## Maintenance

### Update Selenium WebDriver:
```bash
npm update selenium-webdriver
```

### Update test timeout:
Edit `config/config.js`:
```javascript
timeout: 30000 // milliseconds
```

### Monitor test results:
- Check test output for failures
- Review screenshots from failed tests
- Update locators if UI changes
- Add new tests for new features

## Support

For issues or questions:
1. Check browser console for errors
2. Review test output logs
3. Verify element IDs exist in HTML
4. Ensure services are running on correct ports
5. Check environment variables

## License

MIT License - TradeMentor Team
