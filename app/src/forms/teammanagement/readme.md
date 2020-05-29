# COMFORT Team Management
The team management module is to be re-used by all the forms.  It is a generic pattern that requires a simple configuration value and is mounted by each form to its API routes.  

Create the team router with the form slug (unique identifier used throughout the form module for path naming and client naming).  

In your form's index.js:  

```javascript
const constants = require('./constants');
const middleware = require('./middleware');
const routes = require('./routes');

const Router = require('../teammanagement/router');
const teamRouter = new Router(constants.SLUG);

// slug will be the paths.
module.exports.mount = (app) => {
  const p = `/${constants.SLUG}`;
  app.use(p, routes);
  app.use(`${p}/team`, teamRouter.routes);
  app.use(middleware.dataErrors);
  return p;
};
```

This will mount the team management api to your form's api and will use its slug to look up its related Keycloak client.  

## Keycloak Setup
The following assumes you are logged into your Keycloak realm with Realm Administrator role.  

For each form in COMFORT, we will follow the same pattern (naming conventions, role conventions, etc) for setup.  

Each form will require:  
- a client.   
- a set of user assignable roles.   
- a set of non-assignable low level roles, used to secure API and UI features. 

You must know your form slug: ex. `minesoperatorscreening`.   

For this example, the slug will be: `testcase`.   

### Initial Client Setup
We use the form's client to manage resource access for the form. We do not intend to use the client for sign in.  

Logged into the Keycloak realm with Realm Administrator role:  
 
1. Go to Clients  
1. Create Client  
    1. Client ID = comfort-testcase (all lowercase)  
    1. click Save  
1. Edit Client (only changes from the default noted)  
    1. Access Type = confidential  
    1. Standard Flow Enabled = false  
    1. Direct Access Grants Enabled = false  
    1. click Save  

### Roles Setup
COMFORT roles are a very simple hierarchy, each elevation adds a new level of permission.  

**IMPORTANT**: Users will be assigned one role only. 
 
#### Action Roles
These roles will appear in the user's token and are used to secure APIs and UI features.  User's should not be assigned to these roles directly.    

The roles are (from the least permission to most):  
- viewer  
- reviewer  
- editor  
- admin  

1. Go to Clients, select comfort-testcase  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = viewer (all lowercase)  
        1. click Save  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = reviewer (all lowercase)  
        1. click Save  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = editor (all lowercase)  
        1. click Save  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = admin (all lowercase)  
        1. click Save  

#### User Assignable Roles
These roles are composite roles. They group the "action" roles into easily assignable bundles.    

The levels are (from least access to most):  
- Form Viewer  
- Form Reviewer  
- Form Editor  
- Form Administrator  

1. Go to Clients, select comfort-testcase  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = Form Viewer (mixed case)  
        1. Description = Form Viewers have read-only access to submissions.  
        1. click Save  
        1. Composite Roles = true  
        1. Client Roles = comfort-testcase  
        1. Add Selected = viewer  
        1. Associated Roles = viewer  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = Form Reviewer (mixed case)    
        1. Description = Form Reviewers have all the permissions of Form Viewer. Elevated permissions include adding notes and assignments to a submission.  
        1. click Save  
        1. Composite Roles = true  
        1. Client Roles = comfort-testcase  
        1. Add Selected = Form Viewer, reviewer    
        1. Associated Roles = Form Viewer, reviewer    
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = Form Editor (mixed case)  
        1. Description = Form Editors have all the permissions of a Form Reviewer. Elevated permissions include managing form content and status/workflow codes.  
        1. click Save  
        1. Composite Roles = true  
        1. Client Roles = comfort-testcase  
        1. Add Selected = Form Reviewer, editor    
        1. Associated Roles = Form Reviewer, editor    
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = Form Administrator (mixed case)  
        1. Description = Form Administrators have all the permissions of a Form Editor. Elevated permissions include managing users and role assignments.  
        1. click Save  
        1. Composite Roles = true  
        1. Client Roles = comfort-testcase  
        1. Add Selected = Form Editor, admin    
        1. Associated Roles = Form Editor, admin    


#### Request Access Role
This is a special case. Users in this role will have no permissions in the form, and cannot access anything, they are simply waiting for a Form Administrator to assign them to a role.  

When a user requests access to a form, they will be placed in the "Request Access" composite role.  A Form Administrator will assign them a role, or deny their request (remove them from Request Access).  

**IMPORTANT**: it is critical that the "Request Access" role is named correctly (exact case and spacing) as it is looked the one role that is fetched by name.  

The roles are (from the least permission to most):  
- _requestaccess  (action role)  
- Request Access  (assignable role)  

1. Go to Clients, select comfort-testcase  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = _requestaccess (all lowercase with the leading underscore)  
        1. click Save  
    1. Go to Roles tab  
    1. Click Add Role  
        1. Role Name = Request Access (mixed case)  
        1. Description = Users in this role have requested access to the form.  
        1. click Save  
        1. Composite Roles = true  
        1. Client Roles = comfort-testcase  
        1. Add Selected = _requestaccess    
        1. Associated Roles = _requestaccess    
 
### Scope Setup
In order for all of these permissions to end up in the user's token, we need to add them to Client Scopes.  

1. Go to Client Scopes, select comfort  
    1. Go to Scope tab  
        1. Client Roles = comfort-testcase
        1. From Available Roles, select: admin, editor, reviewer, viewer  
        1. Assigned Roles = admin, editor, reviewer, viewer  
        1. Effective Roles = admin, editor, reviewer, viewer  

When a user signs into COMFORT, they use the `comfort-frontend` client.  This client always asks for the `comfort` scope, which now includes comfort-testcase and its action roles.  If a user is assigned to one of comfort-testcase's roles, then we will see comfort-testcase in the resource_access.  

This can be tested by adding a role to your user in the console, then evaluating the token and reviewing its contents.  

1. Go to Users, select yourself  
    1. Go to Role Mappings tab  
        1. Client Roles = comfort-testcase
        1. From Available Roles, select: Form Administrator  
        1. Assigned Roles = Form Administrator  
        1. Effective Roles = Form Administrator, Form Editor, Form Reviewer, Form Viewer, admin, editor, reviewer, viewer  
1. Go to Clients, select comfort-frontend  
    1. Go to Client Scopes tab
        1. Go to Evaluate tab  
        1. User = you...  
        1. click Evaluate  
        1. Go to Generated Access Token tab  
        1. Ensure that aud contains comfort-testcase  
        1. Ensure that resource_access contains comfort-testcase, and its roles contain: admin, editor, reviewer, viewer  
