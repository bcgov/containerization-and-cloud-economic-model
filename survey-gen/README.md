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

These steps are copied from Twilio's blog on [Google Spreadsheets and Python](https://www.twilio.com/blog/2017/02/an-easy-way-to-read-and-write-to-a-google-spreadsheet-in-python.html).

1. Go to the [Google APIs Console](https://console.developers.google.com/).
2. Create a new project.
3. Click Enable API. Search for and enable the Google Drive API.
4. Create credentials for a Web Server to access Application Data.
5. Name the service account and grant it a Project Role of Editor.
6. Download the JSON file.
7. Copy the JSON file to your code directory and rename it to client_secret.json. (OAuth2 credentials)

#### Google Sheet and Allowing Access

1. Open client_secrets.json and make note of the client_email.
2. Go to [Google Drive](https://drive.google.com/).
3. Create a new spreadsheet.
4. Click Share.
5. Provide Editor rights to the client_email found in step #1.
6. Click Done.

Format the spreadsheet as follows:

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

A big thank you to Twilio for their blog post on [Google Spreadsheets and Python](https://www.twilio.com/blog/2017/02/an-easy-way-to-read-and-write-to-a-google-spreadsheet-in-python.html).  It was the basis for this guide.  Their bulleted list was copied directly into "Google Service Account and OAuth2 Credentials".