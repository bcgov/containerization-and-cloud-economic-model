const axios = require('axios');

const { RECIPIENT } = process.env;
if (!RECIPIENT) {
  console.error('RECIPIENT envar must be set');
  process.exit();
}

const body = {
  recipient: RECIPIENT,
  contexts: {
    numberOfTeams: 'Low',
    employeesVsContractors: '10% Employees',
    experienceOfTeams: 'Trained by Working on Previous Teams',
    shadowAppChance: 'Low',
    avgCostDataBreach: 'Low',
    avgOnlineUsers: '5',
    avgLegacyOutage: '10 hours',
    disruptionHourly: '$30',
    avgHoursNewFeats: 'Medium (7500)',
  },
};
console.log(body);
const filename = axios
  .post('http://localhost:3000/render', body)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(filename);
