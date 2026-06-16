const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const seleniumResults = path.resolve(__dirname, '..', 'selenium-mobile-tests', 'results', 'results_selenium_mobile.csv');
const appiumResults = path.resolve(__dirname, '..', 'appium-tests', 'results', 'results_appium.csv');
const seleniumCases = path.resolve(__dirname, '..', 'selenium-mobile-tests', 'testcases_web_mobile.csv');
const appiumCases = path.resolve(__dirname, '..', 'appium-tests', 'testcases_appium.csv');

function readCsv(file) {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split('\n').filter(Boolean);
  const headers = lines[0].split(',').map(h=>h.replace(/"/g,''));
  return lines.slice(1).map(l => {
    // naive CSV split respecting quoted commas
    const cols = l.split(',');
    const obj = {};
    headers.forEach((h,i)=> obj[h]=cols[i]||'');
    return obj;
  });
}

const sResults = readCsv(seleniumResults);
const aResults = readCsv(appiumResults);
const sCases = readCsv(seleniumCases);
const aCases = readCsv(appiumCases);

function mapByCase(rows){
  const m = {};
  rows.forEach(r=>{
    const id = r.case_id || r.case_id;
    m[id]=r;
  });
  return m;
}

const sMap = mapByCase(sResults);
const aMap = mapByCase(aResults);

const combined = [];

sCases.forEach(c=>{
  const id = c.case_id;
  const res = sMap[id]||{};
  combined.push({
    source: 'selenium',
    case_id: id,
    title: c.title,
    expected: c.expected || '',
    result: res.result || 'NOT_RUN',
    notes: res.notes || ''
  });
});

aCases.forEach(c=>{
  const id = c.case_id;
  const res = aMap[id]||{};
  combined.push({
    source: 'appium',
    case_id: id,
    title: c.title,
    expected: c.expected || '',
    result: res.result || 'NOT_RUN',
    notes: res.notes || ''
  });
});

const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(combined);
xlsx.utils.book_append_sheet(wb, ws, 'Combined Results');
const out = path.resolve(__dirname, '..', 'test-results', 'combined_test_report.xlsx');
fs.mkdirSync(path.dirname(out), { recursive: true });
xlsx.writeFile(wb, out);
console.log('Combined report written to', out);
