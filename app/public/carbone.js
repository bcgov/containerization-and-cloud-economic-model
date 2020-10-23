const fs = require('fs');
const carbone = require('carbone');

// Contexts, templates and results
var contextsFile = './public/CEM_contexts.json';
var templateFile = './public/CEM_template.xlsx';
var outputFile = './result.xlsx'

// Populate template with contexts and output it
carboneRun(templateFile, contextsFile, outputFile);

// Populate template with contexts and output it
function carboneRun(tf, cf, of) {
  fs.readFile(cf, 'utf8', function (err, data) {
    if (err) { throw err; }
    processFiles(tf, JSON.parse(data), of);
  });
}

// Generate a report using the sample template provided by carbone module
function processFiles(tf, contexts, of) {
  carbone.render(tf, contexts, function (err, result) {
    if (err) { return console.log(err); }
    fs.writeFileSync(of, result);
  });
}
