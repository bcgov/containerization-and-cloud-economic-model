import gspread
from gspread import Spreadsheet
from oauth2client.service_account import ServiceAccountCredentials
from jinja2 import Environment, PackageLoader, select_autoescape
import argparse
from slugify import slugify
import random
import string

from itertools import groupby

def random_string(string_length=8) -> str:
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))

def strip_relative(path) -> str:
	return path.replace("../../../", "", 1)

def extract_survey_metadata(sheet) -> dict:
	survey_metadata_worksheet = sheet.worksheet("Meta")
	survey_meta = {}
	survey_title_cell = survey_metadata_worksheet.find("Title")
	survey_title = survey_metadata_worksheet.cell(survey_title_cell.row, survey_title_cell.col+1).value

	survey_meta['title'] = survey_title

	return survey_meta

def extract_questions(survey_spreadsheet) -> list:
	question_worksheet = survey_spreadsheet.worksheet("Questions")
	rows = question_worksheet.get_all_records()

	questions = []

	for row in rows:
		question = {}

		# todo refactor so we use abstract question values (not "risky" etc.)
		question['topic'] = row['Topic']
		question['question_text'] = row['Question'].replace('\n', ' ')
		question['slug'] = random_string(8)
		question['risky_answer'] = row['Risky'].replace('\n', ' ')
		question['ok_answer'] = row['OK'].replace('\n', ' ')
		question['best_answer'] = row['Best'].replace('\n', ' ')

		questions.append(question)

	# questions_by_topic = groupby(questions, lambda q: q['topic'])
	#
	# for key, topic in questions_by_topic:
	# 	for question in topic:
	# 		print(f"'{question['question_text']}' is in the topic '{key}'")

	return questions

def process_sheet(output_path) -> None:
	env = Environment(
		loader=PackageLoader('sheet2survey', 'templates'),
		autoescape=select_autoescape(['html', 'xml'])
	)

	# use creds to create a client to interact with the Google Drive API
	scopes = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
	creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scopes)
	client = gspread.authorize(creds)

	# Find a workbook by name and open the first sheet
	# Make sure you use the right name here.
	survey_spreadsheet: Spreadsheet = client.open("Cloud Conformance Survey")

	# Extract metadata used for the surey later on
	survey_meta = extract_survey_metadata(survey_spreadsheet)

	# Extract the question rows
	questions = extract_questions(survey_spreadsheet)

	survey_template = env.get_template('survey.json.jinja2')
	page_path = f"{output_path}/survey.json"

	survey_template.stream(survey_meta=survey_meta,questions=questions).dump(page_path)

def init_argparse() -> argparse.ArgumentParser:
	parser = argparse.ArgumentParser(
		usage="%(prog)s [OUTPUT_PATH]...",
		description="Generate a collection of markdown files."
	)
	parser.add_argument('OUTPUT_PATH')
	return parser

parser = init_argparse()
args = parser.parse_args()
process_sheet(output_path=args.OUTPUT_PATH)
