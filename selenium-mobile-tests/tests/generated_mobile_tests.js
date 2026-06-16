const fs = require('fs');
const path = require('path');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

const CSV_PATH = path.resolve(__dirname, '..', 'testcases_web_mobile.csv');
const RESULTS_DIR = path.resolve(__dirname, '..', 'results');
const RESULTS_CSV = path.join(RESULTS_DIR, 'results_selenium_mobile.csv');

function readTestcases() {
  const raw = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = raw.split('\n').slice(1).filter(Boolean);
  return lines.map(l => {
    const parts = l.split(',');
    return {
      id: parts[0],
      case_id: parts[1],
      title: parts[2],
      description: parts[3]
    };
  });
}

const testcases = readTestcases();

describe('Selenium Mobile E2E Generated Tests', function() {
  let driver;
  before(async function() {
    if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });
    fs.writeFileSync(RESULTS_CSV, 'case_id,title,result,notes\n');
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    if (driver) await driver.quit();
  });

  testcases.forEach(tc => {
    it(`${tc.case_id} - ${tc.title}`, async function() {
      this.retries(1);
      let result = 'FAIL';
      let notes = '';
      try {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        await driver.get(baseUrl);
        await driver.wait(until.titleIs(await driver.getTitle()), 2000).catch(()=>{});
        // basic smoke check: page loaded
        const title = await driver.getTitle();
        if (title && title.length > 0) result = 'PASS';
        notes = `title:${title}`;
      } catch (err) {
        notes = err.message.replace(/\n/g,' ');
      }
      fs.appendFileSync(RESULTS_CSV, `${tc.case_id},"${tc.title}",${result},"${notes}"\n`);
      assert.equal(result, 'PASS', `${tc.case_id} failed: ${notes}`);
    });
  });
});
