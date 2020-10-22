const fs = require('fs');
const carbone = require('carbone');

// Contexts, templates and results
var contextsFile = './public/CEM_contexts.json';
var templateFile = './public/CEM_template.xlsx';

// Read
fs.readFile(contextsFile, 'utf8', function (err, data) {
  if (err) {
    throw err;
  }
  const contexts = JSON.parse(data);
  processFiles(contexts);
});

// Generate a report using the sample template provided by carbone module
function processFiles(contexts) {
  carbone.render(templateFile, contexts, function(err, result){
    if (err) {
      return console.log(err);
    }
    // write the result
    fs.writeFileSync('result.xlsx', result);
  });
}
