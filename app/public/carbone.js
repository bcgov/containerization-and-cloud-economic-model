const fs = require('fs');
  const carbone = require('carbone');

  // Data to inject
  var data = {
    numberOfTeams: "Low",
    employeesVsContractors: "10% Employees",
    experienceOfTeams: "Trained by Working on Previous Teams",
    shadowAppChance: "Medium",
    avgCostDataBreach: "Medium",
    avgOnlineUsers: "5",
    avgLegacyOutage: "10 hours",
    disruptionHourly: "$30",
    avgHoursNewFeats: "Medium (7500)"
  };

  // Generate a report using the sample template provided by carbone module
  carbone.render('./public/CEM_template.xlsx', data, function(err, result){
    if (err) {
      return console.log(err);
    }
    // write the result
    fs.writeFileSync('result.xlsx', result);
  });
