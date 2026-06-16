// Test Configuration
module.exports = {
  // Base URL for the application
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  
  // Backend API URL
  apiUrl: process.env.API_URL || 'http://localhost:4000',
  
  // Test timeout in milliseconds
  timeout: 40000,
  
  // Browser settings
  browser: {
    type: process.env.BROWSER || 'chrome',
    headless: process.env.HEADLESS !== 'false', // false for debugging
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-extensions'
    ]
  },
  
  // Test user credentials
  testUser: {
    email: process.env.TEST_EMAIL || 'demo@tradementor.com',
    password: process.env.TEST_PASSWORD || 'User@123456'
  },
  
  // Wait times (in milliseconds)
  waits: {
    short: 3000,
    medium: 8000,
    long: 15000,
    veryLong: 20000
  },
  
  // Retry settings
  retry: {
    count: 3,
    delay: 1500
  }
};
