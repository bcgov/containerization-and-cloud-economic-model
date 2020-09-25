export const SampleData = Object.freeze({
  // Sample data to autopopulate form in Test envs
  cost: {
    numberOfTeams: 'High',
    employeesVsContractors: '10:90',
    migrationExperience: 'Learned on previous teams',
    shadowAppDependencies: 'High'
  },
  value: {
    avgBreachCost: 'High',
    avgUsersPerApp: '100',
    avgLegacyOutageHourlyValue: '10 hours',
    disruptionHourlyValue: '$10 CAD',
    avgYearlyFeatureHours: 'Medium (7500)'
  },
  contact: {
    sendEmail: 'optional@gov.bc.ca'
  },
  business: {
    name: 'LTO SOFTWARE CONSULTING INC.',
    addressLine1: '123 Fake st',
    addressLine2: 'West',
    city: 'Victoria',
    province: 'BC',
    postalCode: 'VXX 2YY'
  },
  primaryContact: {
    contactType: 'PRIMARY',
    firstName: 'Lucas',
    lastName: 'O\'Neil',
    phone1: '555-555-5555',
    phone2: '777-777-7777',
    email: 'fake@email.ccc'
  },
  covidContact: {
    contactType: 'COVID_COORDINATOR',
    firstName: 'Jane',
    lastName: 'Smith',
    phone1: '666-666-6666',
    phone2: '',
    email: 'no@yes.com'
  },
  location: {
    mineNumber: '1234567',
    startDate: '2020-05-22',
    endDate: '2020-05-29',
    city: 'Victoria, BC',
    numberOfWorkers: '20',
    accTents: true,
    tentDetails: 'Down the road 10km',
    accMotel: true,
    motelName: 'Motel 6',
    motelAddressLine1: '456 Some St',
    motelAddressLine2: '',
    motelCity: 'Prince George',
    motelProvince: 'BC',
    motelPostalCode: 'PGP GPG',
    accWorkersHome: true
  },
  attestation: {}
});
