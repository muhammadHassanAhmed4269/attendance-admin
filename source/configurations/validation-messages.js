const validationMessages = {
  permissions: {
    queryString: "Query string is required",
    formData: "Form data is required",
    invalidPermissionId: "Invalid permission ID",
    invalidPermissionName: "Invalid permission name",
    permissionNameRequired: "Permission name is required",
  },

  roles: {
    queryString: "Query string is required",
    formData: "Form data is required",
    invalidRoleId: "Invalid role ID",
    invalidRoleName: "Invalid role name",
    roleNameRequired: "Role name is required",
    roleNameRequired: "Invalid role name",
    invalidPermissions: "Invalid permissions",
  },

  designations: {
    queryString: "Query string is required",
    formData: "Form data is required",
    invalidDesinationId: "Invalid designation ID",
    invalidDesignationName: "Invalid designation name",
    designationNameRequired: "Designation name is required",
  },

  departments: {
    queryString: "Query string is required",
    formData: "Form data is required",
    invalidDepartmentId: "Invalid department ID",
    invalidDepartmentName: "Invalid department name",
    departmentNameRequired: "Department name is required",
  },

  units: {
    queryString: "Query string is required",
    formData: "Form data is required",
    invalidUnitId: "Invalid unit ID",
    invalidunitName: "Invalid designation name",
    unitNameRequired: "Unit name is required",
  },

  shifts: {
    queryString: "Query string is required",
    formData: "Form data is required",
    invalidShiftId: "Invalid shift ID",
    invalidShiftName: "Invalid shift name",
    shiftNameRequired: "Shift name is required",
  },
};

module.exports = validationMessages;
