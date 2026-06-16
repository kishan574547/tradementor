const fs = require('fs');
const path = require('path');
const csv = require('csv');
const xlsx = require('xlsx');

function csvToXlsx(csvPath, xlsxPath) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const records = [];
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const headers = lines.shift().split(',').map(h => h.trim());
  lines.forEach(line => {
    const cols = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = (cols[i] || '').trim());
    records.push(obj);
  });
  const ws = xlsx.utils.json_to_sheet(records);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'TestCases');
  xlsx.writeFile(wb, xlsxPath);
}

function generateReport() {
  const csvFile = path.join(__dirname, 'testcases_web.csv');
  const xlsxFile = path.join(__dirname, 'testcases_web.xlsx');
  csvToXlsx(csvFile, xlsxFile);
  const csvFile2 = path.join(__dirname, 'testcases_appium.csv');
  const xlsxFile2 = path.join(__dirname, 'testcases_appium.xlsx');
  csvToXlsx(csvFile2, xlsxFile2);
  console.log('Generated', xlsxFile, xlsxFile2);
}

if (require.main === module) generateReport();

module.exports = { csvToXlsx, generateReport };
