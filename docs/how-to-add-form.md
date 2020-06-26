---
title: Common Forms Toolkit - Add new form
description: How to add a form to COMFORT
---

As a Pre-requisite, please ensure you have read the [Overview](overview.md), [Developer Guide](developer-guide.md) and [Team Management](team-management.md) documentation.    

In order to have new form hosted in COMFORT, you need to have the following:

1. Security / Keycloak
2. Database / Tables
3. API
4. UI (TBD)

To better illustrate your coding responsibilities, and what is required, review the code under [sample](sample). This contains a set of migration scripts and API code. If you wanted to stand up the sample (myform), copy code under [sample](sample) to [src](../app/src)

```shell script
cp -R sample/* ../app/src
```

## Security / Keycloak
For Security, you will need to set up Keycloak with a service client and a role.  Review and follow the [Team Management](team-management.md) documentation which includes Keycloak setup.  

## Database
COMFORT data resides in a Postgres Database.  
Find the database configuration in [config/custom-environment-variables](../app/config) in the db section.  
By default, the database name is `comfort`. 
All data resides in the `public` schema.  

The underlying data access framework is [objection](https://vincit.github.io/objection.js/)/[knex](http://knexjs.org).  The runtime configuration for knex is in [app/knexfile.js](../app/knexfile.js).  Note that there are some data type parsing overrides.

Migration scripts are found under [migrations](../app/src/db/migrations).  

You will need to create a set of migration scripts for your application. 
You will need to run your migrations before starting COMFORT.  
```shell script
npm run migrate
```

Please review the knex documentation about [migrations](http://knexjs.org/#Migrations). 

### Tables
The following table lists the core tables and their purpose.  Replace `app_` with a short name/prefix to isolate form data.  This allows you to have many different forms in the same database; we do not segregate forms data by schema.

| Table | Description |
| --- | --- |
| form | This is the parent table, all app forms will be 'registered' here, this allows one to search for various forms running in your comfort application |
| app\_form | Simple table, just has an id and description, this is the parent table for your form |
| app\_form\_version | You may need to change structure or have different status codes, this allows you to version your form. |
| app\_status\_code | List of **all** statuses for your workflow. |
| app\_version\_status\_code | List of available statuses for a particular version of your form |
| app\_submission | Parent table for your submitted data.  This is the parent table for your custom data/questions/answers |
| app\_submission\_status | Status workflow for an individual submission |
| app\_note | Notes for a submission or for a submission status |
| app\_settings | Runtime configuration or settings for your forms, emails, etc.|

You will create your business specific data tables and relate them to your app_submission table.  You can have as many tables as you need to store and structure the data you wish to collect.  

### Userstamps and Timestamps
All tables share the same userstamp and timestamp fields.  

| Column | Description |
| --- | --- |
| createdBy | name of user creating the record. You must set this in your code/scripts. |
| createdAt | timestamp with timezone on record create.  Automatically set through objection classes and table defaults. |
| updatedBy | name of user creating the record. You must set this in your code/scripts. |
| updatedAt | timestamp with timezone on record update.  Automatically set through objection classes and table defaults. |

#### form
This is the parent table, all app forms will be 'registered' here, this allows one to search for various forms running in your comfort application.

| Column | Description |
| --- | --- |
| formId | Primary Key - UUID  |
| name | Unique long name of your form. |
| slug | Unique shortname of your form, will be used for API paths |
| prefix | Unique prefix for you form tables.  Keep it short!  |
| public | Boolean whether this form is for public submissions.  |
| active | Boolean - is this form active or retired.  |
| keywords | String array, allow the form to be searchable by keywords. |

#### app\_form
Simple table, just has an id and description, this is the parent table for your form

| Column | Description |
| --- | --- |
| formId | Primary Key - foreign key from form.formId  |
| description | describe your form, useful for search results. |

#### app\_form\_version
You may need to change structure or have different status codes, this allows you to version your form.  

| Column | Description |
| --- | --- |
| formVersionId | Primary Key - integer  |
| formId | foreign key from form.formId / app\_form.formId  |
| changes | Describe/document the changes from previous version |

#### app\_status\_code
List of **all** statuses for your workflow.  

A basic example of statuses that support a workflow would be: Submitted, Assigned, Completed.  
1. Submitted - user has filled out your form and submitted it.  Needs action by your team.  
2. Assigned - a team member has been assigned to review the submission and do any required business actions.  
3. Completed - team members have reviewed the submission and have done any follow-up business required.  

| Column | Description |
| --- | --- |
| code | Primary Key - string  |
| display | Display value for this code  |
| enabled | Boolean - whether this code is enabled and can be used. |
| nextCodes | String array, list of codes that this status can go to next. |
| allowedClassifications | String array, you may want to add additonal context to a status (ex. a status of Complete could have a grade/classification of Pass or Fail). |

#### app\_version\_status\_code
List of available statuses for a particular version of your form. 
 
| Column | Description |
| --- | --- |
| versionStatusCodeId | Primary Key - integer |
| formVersionId | Foreign Key - from app\_form\_version.formVersionId  |
| code | Foreign Key - from app\_status\_code.code  |

#### app\_submission 
Parent table for your submitted data.  This is the parent table for your custom data/questions/answers.  

| Column | Description |
| --- | --- |
| submissionId | Primary Key - UUID |
| formVersionId | Foreign Key - from app\_form\_version.formVersionId  |
| deleted | Boolean, for soft deletion of data.  |

Note that you can add more columns to this table to suit your business needs.  This could be a type indicator or a classification or a confirmation number. Any meta-data that will be useful for grouping submissions together.  
 
#### app\_submission\_status
Status workflow for an individual submission.  Once a submission is made, this is supports the workflow for you and your team. There will be many status records for a single submission.  

| Column | Description |
| --- | --- |
| submissionStatusId | Primary Key - integer |
| submissionId | Foreign Key - from app\_submission.submissionId |
| code | Foreign Key - from app\_status\_code.code  |
| classification | Should be from app\_status\_code.allowedClassifications for the code. |
| assignedTo | Name of team member assigned to this submission.  |
| assignedEmail | Email address of team member assigned to this submission.  |
| actionDate | Date relevant to the status (when assigned, when completed, etc. ) |

#### app\_note
Notes for a submission or for a submission status. Provide additional context about the submission as a whole, or about a particular status (ex. Notes for the team member to take after they have been assigned, or notes about the work they have done and justification for a Pass or Fail when marking Complete).  

| Column | Description |
| --- | --- |
| noteId | Primary Key - integer |
| submissionId | Foreign Key - from app\_submission.submissionId |
| submissionStatusId | Foreign Key - from app\_submission\ submissionStatusId |
| note | Free form text field. |

#### app\_settings
Runtime configuration or settings for your forms, emails, etc.  

| Column | Description |
| --- | --- |
| name | Primary Key - string, name for the setting |
| enabled | Boolean - is the setting currently valid and useable |
| config | JSONB - store a json configuration in any shape you need. | 

### Sample Migrations
Sample [migrations](sample/db/migrations) illustrate adding your implementations of the 'common' tables, your form/business specific tables, and initializing the data (status codes, settings).  

This assumes that the main Metadata/Form table has already been migrated to your database.
```js
const stamps = require('../stamps');

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable('form', table => {
      table.uuid('formId').primary();
      table.string('name').unique().notNullable();
      table.string('slug').unique().notNullable().comment('This will be used for paths and user interactions');
      table.boolean('public').notNullable().defaultTo(true);
      table.boolean('active').notNullable().defaultTo(true);
      table.specificType('keywords', 'text ARRAY');
      table.string('prefix').unique().notNullable().comment('This is the database table prefix for all the form business tables.');
      stamps(knex, table);
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.dropTableIfExists('form'));
};
```

## API (Node Server)
Out of the box, the 'common' tables have [models](../app/src/forms/common/models), a [controller](../app/src/forms/common/controller.js), a [data service](../app/src/forms/common/dataService.js) and [routes](../app/src/forms/common/router.js).  Also included: [Team management](../app/src/forms/teammanagement) (see Keycloak section). 
 
You will need to create your own controllers, models, routes, etc for your custom tables.  

### Models
Now you know the tables, please familiarize yourself with the common [models](../app/src/forms/common/models/base.js).  
And you can review the sample [models](sample/forms/myform/models).  

In the sample, we add a single custom table/model: Survey (myform\_submission\_survey).  Note the `relationMappings` in the Submission model.

For models, you will need to extend the Common Models for Form, Version, Status Code, Note, Settings, Submission and Submission Status.  
You need to set the tablePrefix and each of the Relations and associated classes.  

*Submission*: you will want to add relations to your business data tables and models, and if you have added any columns to the table, you will need to update the jsonSchema.  

You will need to add any business data table models yourself.  

In order to pass these particular implementations to your Data Service and Controllers, create a wrapper class that returns each of your Models as a property (see [models/index](sample/forms/myform/models/index.js)).

### Controller
In this sample, the [controller](sample/forms/myform/controller.js) is just a coordinator between the Router and the Data Service. You can make this as complex as you need, coordinate between other services (email, document generation). 
 
### Data Service
In this sample, the [data service](sample/forms/myform/dataService.js) is illustrates the database calls to your specific instances of the tables, this is acheived by passing in your [Models](sample/forms/myform/models/index.js).  As you add more tables, you can expand as necessary.  

### Router
In this sample, the [router](sample/forms/myform/router.js) exposes the api uses the controller for coordination with the services.  Notice that it has middleware to check authentication against your Keycloak resource.  You can add other middleware as needed - for example, parsing and validating query parameters.    

### Mount the API
Review [index.js](sample/forms/myform/index.js).  This creates all the specific instances of your code: your controller, your data service, your router, your models.  It also loads the common components and team components.  The mount method is the complete API for your form.  

To mount the API, simply add the following to [routes/v1.js](../app/src/routes/v1.js):

```js
const myform = require('../forms/myform');
const myformPath = myform.mount(router);
// add the path to the endpoints list (optional)
 router.get('/', (_req, res) => {
   res.status(200).json({
     endpoints: [
       '/docs',
       myformPath
     ]
   });
```

## UI
Coming soon...
