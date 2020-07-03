# survey-gen
Generate dynamic surveys from easy to use sources

## Getting Started

### Requirements

* [Python 3](https://www.python.org/downloads/)
* Google Sheets (shared, specific format below)
* Google Drive Service Account
* Google Drive web credentials file

### Google Sheets and Credentials

#### Google Service Account and OAuth2 Credentials

1. Go to the [Google APIs Console](https://console.developers.google.com/).
2. Select or create a project using the Project drop-down.  Look beside the Google APIs Hamburger Button, top left.
3. Click Enable APIs and Services.
4. Search for and open the [Google Sheets API](https://console.developers.google.com/apis/library/sheets.googleapis.com).
5. Click Enable.
6. Click Create Credentials.
7. "Which API are you using?": Google Sheets API.
8.  "Where will you be calling the API from?": Web server.
9.  "What data will you be accessing?": Application data.
10. "Are you planning ot use thsi API with App Engine or Compute Engine?": No, I'm not using them.
11. Click What Credentials Do I Need?
12. Create a meaningful Service account name, like gs-test.
13. Select Role > Project > Editor.
14. "Key type": JSON.
15. Click Continue.
16. A JSON file will download.  Then click Close.
17. Copy that to your code directory and rename it to client_secret.json. (OAuth2 credentials)

#### Google Sheet and Allowing Access

1. Open client_secrets.json and make note of the client_email.  It is also available from the API Credentials page.
2. Go to [Google Drive](https://drive.google.com/).
3. Create a new spreadsheet.
4. Click Share.
5. Provide Editor rights to the client_email found in step #1.
6. Uncheck Notify people.  All that would do is create a bounced email.
7. Click Done.

#### Spreadsheet Formatting

Create the spreadsheet as follows:

* Location: Root of Google Drive
* Name: Cloud Conformance Survey
* First worksheet:
  * Name: "Meta"
  * A1: "Title"
  * A2: Title as appropriate
* Second worksheet:
  * Name: "Questions"
  * A1: "Topic"
  * B1: "Question"
  * C1: "Risky"
  * D1: "OK"
  * E3: "Best"
  * Fill out rows below as appropriate

#### Execution

Execute as below.  Output will be found in survey.json.

```
python ./sheet2survey.py .
```

## Contributing

Please create an issue to request new features or report bugs. Pull requests are always welcome!

## Acknowledgments

A big thank you to Twilio for their blog post on [Google Spreadsheets and Python](https://www.twilio.com/blog/2017/02/an-easy-way-to-read-and-write-to-a-google-spreadsheet-in-python.html).  It was instrumental to this guide.