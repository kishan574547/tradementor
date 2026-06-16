# Selenium Tests Directory Index

## 📁 Project Structure

```
selenium-tests/
├── config/
│   └── config.js                 # Test configuration and settings
├── utils/
│   ├── driverSetup.js           # WebDriver initialization for Chrome/Firefox
│   └── testHelpers.js           # Reusable test utilities and helper functions
├── tests/
│   ├── login.test.js            # Authentication and login flow tests (7 test cases)
│   ├── dashboard.test.js        # Dashboard navigation tests (7 test cases)
│   └── portfolio.test.js        # Portfolio page functionality tests (6 test cases)
├── package.json                  # Dependencies and NPM scripts
├── .env.example                  # Environment variables template
├── README.md                      # Complete test documentation
├── SETUP_GUIDE.md               # Step-by-step setup instructions
└── INDEX.md                      # This file
```

## 📋 Quick Command Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm test` | Run all tests |
| `npm run test:login` | Run login tests only |
| `npm run test:dashboard` | Run dashboard tests only |
| `npm run test:portfolio` | Run portfolio tests only |
| `npm run test:watch` | Run tests in watch mode |

## 📝 Test Files Description

### `tests/login.test.js` (7 Tests)
**Purpose:** Verify authentication and login functionality

1. **should load login page successfully** - Checks login page renders with all required fields
2. **should login with valid credentials** - Tests successful login flow
3. **should display error message with invalid credentials** - Tests error handling
4. **should have pre-filled demo credentials** - Verifies demo account values
5. **should navigate to register page from login** - Tests link navigation
6. **should validate email field is required** - Tests form validation
7. **should validate password field is required** - Tests form validation

**Expected:** All 7 tests should pass ✅

---

### `tests/dashboard.test.js` (7 Tests)
**Purpose:** Verify authenticated user dashboard navigation and access

1. **should load dashboard after login** - Tests redirect after successful login
2. **should display dashboard header** - Verifies dashboard layout renders
3. **should have navigation menu** - Tests navigation element presence
4. **should be able to access portfolio page** - Tests navigation to portfolio
5. **should be able to access watchlist page** - Tests navigation to watchlist
6. **should be able to access profile page** - Tests navigation to profile
7. **should persist user session** - Tests session management across pages

**Expected:** All 7 tests should pass ✅
**Note:** These tests may show 0 passing if backend is not configured (expected behavior for UI-only testing)

---

### `tests/portfolio.test.js` (6 Tests)
**Purpose:** Verify portfolio page functionality and responsiveness

1. **should load portfolio page** - Tests portfolio page loads
2. **should display portfolio content** - Verifies content renders
3. **should be responsive on portfolio page** - Tests mobile viewport (375x667)
4. **should reset viewport after mobile test** - Resets viewport to desktop
5. **should navigate from portfolio to watchlist** - Tests inter-page navigation
6. **should navigate from portfolio to dashboard** - Tests navigation back to dashboard

**Expected:** All 6 tests should pass ✅

---

## 🛠️ Utility Files Description

### `config/config.js`
Configuration file for all tests:
- Base URL and API endpoint
- Browser settings (Chrome/Firefox, headless mode)
- Wait timeouts for stability
- Test user credentials
- Retry settings for flaky tests

### `utils/driverSetup.js`
WebDriver initialization:
- Creates Chrome or Firefox driver
- Sets implicit waits
- Sets page load timeout
- Sets script timeout

### `utils/testHelpers.js`
Helper functions used in tests:
- `findById(driver, id)` - Find element by ID
- `clickElement(driver, locator)` - Click with retry logic
- `typeText(driver, locator, text)` - Type with clear
- `navigateTo(driver, path)` - Navigate to URL
- `waitForPageLoad(driver)` - Wait for page ready state
- `sleep(ms)` - Delay execution

---

## 📊 Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Cases | 20 |
| Login Tests | 7 |
| Dashboard Tests | 7 |
| Portfolio Tests | 6 |
| Total LOC (excluding node_modules) | ~500 |
| Avg Test Duration | 2-3 seconds each |
| Full Suite Duration | 2-3 minutes |

---

## ✅ Test Status

```
Login Tests:      ✅ Ready
Dashboard Tests:  ✅ Ready  
Portfolio Tests:  ✅ Ready
GitHub Actions:   ✅ Configured
```

---

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start Services**
   ```bash
   # Backend (Terminal 1)
   cd ../backend && npm run dev
   
   # Frontend (Terminal 2)
   cd ../frontend && npm run dev
   ```

4. **Run Tests** (Terminal 3)
   ```bash
   npm test
   ```

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete test documentation |
| `SETUP_GUIDE.md` | Step-by-step setup instructions |
| `INDEX.md` | This file - directory structure overview |
| `.env.example` | Environment variables template |

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and npm scripts |
| `config/config.js` | Test configuration |
| `.env` | Environment variables (create from .env.example) |

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase `waits` in `config/config.js` |
| Can't find Chrome | Install ChromeDriver or update PATH |
| DATABASE_URL not found | Create `../.env` in backend directory |
| Port 3000 already in use | Kill process: `lsof -i :3000` then `kill -9 <PID>` |

---

## 📝 Adding New Tests

1. Create new file in `tests/` with `.test.js` extension
2. Follow structure of existing tests
3. Use helpers from `utils/testHelpers.js`
4. Add test ID to HTML elements being tested
5. Run: `npm test`

Example:
```javascript
const { expect } = require('chai');
const { createDriver, quitDriver } = require('../utils/driverSetup');

describe('My Feature Tests', function() {
  let driver;

  beforeEach(async function() {
    driver = await createDriver();
  });

  afterEach(async function() {
    await quitDriver(driver);
  });

  it('should test my feature', async function() {
    // Test code here
  });
});
```

---

## 🔐 Security Notes

- ✅ Test credentials stored in `.env` (not in source)
- ✅ No real credentials in test files
- ✅ Tests run in isolated Chrome process
- ✅ Database snapshots isolated by test

---

## 📞 Support & Contact

For issues, refer to:
1. `SETUP_GUIDE.md` - Setup troubleshooting
2. `README.md` - Complete documentation
3. Browser console errors
4. Test runner output

---

## 📅 Version Info

- **Created:** June 2026
- **Selenium:** 4.20.0
- **Mocha:** 10.2.0
- **Chai:** 4.3.10
- **Node:** 14+ required

---

**Status:** ✅ Production Ready
**Last Updated:** June 2026
**Maintainer:** TradeMentor Team
