jest.mock('../../src/forms/teammanagement/service', () => {
  return jest.fn().mockImplementation(() => {
    return {
      processAccessRequest: jest.fn().mockResolvedValue({processAccessRequest: true}),
      getClient: jest.fn().mockResolvedValue({getClient: true}),
      getUsers: jest.fn().mockResolvedValue({getUsers: true}),
      getUser: jest.fn().mockResolvedValue({getUser: true}),
      getUserRoles: jest.fn().mockResolvedValue({getUserRoles: true}),
      updateUserRoles: jest.fn().mockResolvedValue({updateUserRoles: true}),
      getRoles: jest.fn().mockResolvedValue({getRoles: true}),
      getRole: jest.fn().mockResolvedValue({getRole: true}),
      getRoleUsers: jest.fn().mockResolvedValue({getRoleUsers: true}),
      updateRoleUsers: jest.fn().mockResolvedValue({updateRoleUsers: true})
    };
  });
});

