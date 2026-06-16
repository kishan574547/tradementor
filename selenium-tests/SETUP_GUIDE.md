# TradeMentor E2E Testing - Setup Guide

## Overview

This guide will help you set up and run the Selenium E2E tests for TradeMentor. The tests cover login, dashboard, and portfolio functionality.

## Quick Start

### 1. Install All Dependencies

```bash
# Root directory
npm install --legacy-peer-deps

# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install --legacy-peer-deps
cd ..

# Selenium Tests
cd selenium-tests
npm install
cd ..
```

### 2. Configure Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env  # if example exists
```

Edit `backend/.env`:
```env
# Database - You can use SQLite for testing
DATABASE_URL="file:./dev.db"

# Or PostgreSQL (if you have it running)
# DATABASE_URL="postgresql://postgres:password@localhost:5432/tradementor"

NODE_ENV=development
PORT=4000
JWT_SECRET=test_secret_key_for_development
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env.local)
Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

#### Selenium Tests (.env)
Edit `selenium-tests/.env`:
```env
BASE_URL=http://localhost:3000
API_URL=http://localhost:4000
BROWSER=chrome
HEADLESS=true
TEST_EMAIL=demo@tradementor.com
TEST_PASSWORD=User@123456
```

### 3. Start the Services

In three separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Should show: TradeMentor API running on http://localhost:4000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Should show: ▲ Next.js ... Local: http://localhost:3000
```

**Terminal 3 - Run Tests:**
```bash
cd selenium-tests
npm test
```

## Database Setup

### Option 1: SQLite (No Setup Required)
Best for quick testing without infrastructure:

```env
DATABASE_URL="file:./dev.db"
```

### Option 2: PostgreSQL
For production-like testing:

1. Install PostgreSQL
2. Create a database:
   ```bash
   createdb tradementor
   ```
3. Update `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/tradementor"
   ```
4. Run migrations:
   ```bash
   cd backend
   npx prisma migrate dev
   ```

## Test Commands

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
# Login tests only
npm run test:login

# Dashboard tests only
npm run test:dashboard

# Portfolio tests only
npm run test:portfolio
```

### Run with Watch Mode
```bash
npm run test:watch
```

### View Tests in Browser (Non-Headless)
Edit `selenium-tests/config/config.js`:
```javascript
browser: {
  headless: false  // Change to false to see browser
}
```

Then run:
```bash
npm test
```

## Test Coverage

### Login Tests
- ✅ Load login page
- ✅ Login with valid credentials
- ✅ Display error with invalid credentials
- ✅ Pre-filled demo credentials
- ✅ Navigate to register page
- ✅ Email field validation
- ✅ Password field validation

### Dashboard Tests
- ✅ Load dashboard after login
- ✅ Display dashboard header
- ✅ Navigation menu
- ✅ Access portfolio page
- ✅ Access watchlist page
- ✅ Access profile page
- ✅ User session persistence

### Portfolio Tests
- ✅ Load portfolio page
- ✅ Display portfolio content
- ✅ Responsive design (mobile)
- ✅ Viewport reset
- ✅ Navigation between pages

## Troubleshooting

### Issue: "DATABASE_URL not found"
**Solution:** Create `.env` file in backend directory with `DATABASE_URL` variable

### Issue: "Cannot find Chrome/ChromeDriver"
**Solution:** 
1. Ensure Chrome is installed
2. Update ChromeDriver: `npm install -g chromedriver`
3. Or use Firefox: Set `BROWSER=firefox` in config

### Issue: Timeout errors
**Solution:**
1. Increase wait times in `config/config.js`
2. Ensure services are running on correct ports
3. Check backend is responding: `curl http://localhost:4000`
4. Check frontend is responding: `curl http://localhost:3000`

### Issue: Login tests failing
**Solution:**
1. Verify database is set up
2. Check backend logs for Prisma errors
3. Ensure test user exists in database
4. Try running with visible browser: `headless: false`

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

## Integration with CI/CD

### GitHub Actions
Tests are configured to run automatically on push/PR:

```bash
git push origin main
```

This triggers `.github/workflows/selenium-tests.yml` which:
1. Installs dependencies
2. Starts frontend and backend
3. Runs all tests
4. Reports results

## Adding Test IDs to Components

For Selenium to find elements reliably, add `id` attributes:

```tsx
// Good - Has stable ID
<input id="email" type="email" />

// Bad - Uses class selector (can break with styling changes)
<input className="email-input" type="email" />
```

## Test Execution Flow

```
1. Test Starts
   ↓
2. WebDriver launches Chrome
   ↓
3. Navigate to http://localhost:3000/login
   ↓
4. Find elements by ID
   ↓
5. Fill form fields
   ↓
6. Click login button
   ↓
7. Wait for redirect
   ↓
8. Assert URL changed
   ↓
9. Close browser
   ↓
10. Test Complete
```

## Performance Tips

1. **Use headless mode** for faster test execution
2. **Increase timeouts** if running on slow machine
3. **Parallelize tests** using test runners
4. **Use cached dependencies** with CI/CD

## Debugging Tips

### View in Real Time
```javascript
// In test file
headless: false // Set in config
```

### Take Screenshots
```javascript
const screenshot = await driver.takeScreenshot();
require('fs').writeFileSync('debug.png', screenshot, 'base64');
```

### Log Page Source
```javascript
const source = await driver.getPageSource();
console.log(source);
```

### Check Current URL
```javascript
const url = await driver.getCurrentUrl();
console.log('Current URL:', url);
```

## Maintenance

### Update Selenium
```bash
cd selenium-tests
npm update selenium-webdriver
```

### Update Mocha
```bash
cd selenium-tests
npm update mocha
```

### Run Audit
```bash
cd selenium-tests
npm audit
npm audit fix
```

## Next Steps

1. ✅ Set up environment variables
2. ✅ Start frontend and backend services
3. ✅ Run tests with `npm test`
4. ✅ Review test results
5. ✅ Add more tests as needed
6. ✅ Configure CI/CD pipeline

## Support

For issues:
1. Check browser console for errors
2. Review test output logs
3. Verify element IDs exist in HTML
4. Ensure services are running
5. Check .env file configuration

## Additional Resources

- [Selenium WebDriver Docs](https://www.selenium.dev/documentation/)
- [Mocha Testing Framework](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Next.js Documentation](https://nextjs.org/)

---

**Last Updated:** June 2026
**Test Framework:** Selenium WebDriver 4.20.0 + Mocha 10.2.0
**Status:** ✅ Ready for Production
