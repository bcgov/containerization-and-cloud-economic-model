export const ApiRoutes = Object.freeze({
  HELLO: '/hello',
  MINESATTESTATIONS: '/minesattestations'
});


// TODO: Separate these by client (ie form type?), separate constants files into silos?
export const AppRoles = Object.freeze({
  TESTROLE: 'testrole',
  EDITOR: 'editor',
  VIEWER: 'viewer',
  ADMIN: 'admin',
  REVIEWER: 'reviewer'
});
export const AppClients = Object.freeze({
  MINESATTESTATIONS: 'comfort-minesattestations',
});

// TODO: I think these will be dynamic from the DB form definition. For now get it working with constants
export const Statuses = Object.freeze({
  SUBMITTED: 'Submitted',
  ASSIGNED: 'Assigned',
  SCHEDULED: 'Scheduled',
  FOLLOWUP: 'Follow-up',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
});
