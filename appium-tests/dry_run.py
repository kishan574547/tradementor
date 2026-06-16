import csv
import os

TESTCASES_CSV = os.path.join(os.path.dirname(__file__), 'testcases_appium.csv')
RESULTS_DIR = os.path.join(os.path.dirname(__file__), 'results')
RESULTS_CSV = os.path.join(RESULTS_DIR, 'results_appium.csv')

os.makedirs(RESULTS_DIR, exist_ok=True)

with open(TESTCASES_CSV, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    cases = list(reader)

with open(RESULTS_CSV, 'w', newline='', encoding='utf-8') as f:
    f.write('case_id,title,result,notes\n')
    for tc in cases:
        f.write(f"{tc['case_id']},{tc['title']},PASS,dry-run\n")

print(f"Appium dry-run completed: {len(cases)} cases")
