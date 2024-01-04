const customFrontendRoutes = {
  auth: {
    login: "/",
    logout: "/logout",
  },

  dashboard: {
    get: "/dashboard",
  },

  permissions: {
    getList: "/permissions",
    get: "/permission",
    addNew: "/permission/add-new",
    update: "/permission/update",
  },

  roles: {
    getList: "/roles",
    get: "/role",
    addNew: "/role/add-new",
    update: "/role/update",
  },

  designations: {
    getList: "/designations",
    get: "/designation",
    addNew: "/designation/add-new",
    update: "/designation/update",
  },

  departments: {
    getList: "/departments",
    get: "/department",
    addNew: "/department/add-new",
    update: "/department/update",
  },

  units: {
    getList: "/units",
    get: "/unit",
    addNew: "/unit/add-new",
    update: "/unit/update",
  },

  shifts: {
    getList: "/shifts",
    get: "/shift",
    addNew: "/shift/add-new",
    update: "/shift/update",
  },

  employees: {
    getList: "/employees",
    get: "/employee",
    addNew: "/employee/add-new",
    update: "/employee/update",
  },

  attendances: {
    getList: "/attendances",
    get: "/attendance",
    addNew: "/attendance/add-new",
    update: "/attendance/update",
  },

  holidays: {
    getList: "/holidays",
    get: "/holiday",
    addNew: "/holiday/add-new",
    update: "/holiday/update",
  },
};

const customBackendRoutes = {
  permissions: {
    getList: "/api/v1/auth/permissions",
    get: "/api/v1/auth/permission",
    addNew: "/api/v1/auth/permission/add-new",
    update: "/api/v1/auth/permission/update",
    delete: "/api/v1/auth/permission/delete",
  },

  roles: {
    getList: "/api/v1/auth/roles",
    get: "/api/v1/auth/role",
    addNew: "/api/v1/auth/role/add-new",
    update: "/api/v1/auth/role/update",
    delete: "/api/v1/auth/role/delete",
  },

  designations: {
    getList: "/api/v1/auth/designations",
    get: "/api/v1/auth/designation",
    addNew: "/api/v1/auth/designation/add-new",
    update: "/api/v1/auth/designation/update",
    delete: "/api/v1/auth/designation/delete",
  },

  departments: {
    getList: "/api/v1/auth/departments",
    get: "/api/v1/auth/department",
    addNew: "/api/v1/auth/department/add-new",
    update: "/api/v1/auth/department/update",
    delete: "/api/v1/auth/department/delete",
  },

  units: {
    getList: "/api/v1/auth/units",
    get: "/api/v1/auth/unit",
    addNew: "/api/v1/auth/unit/add-new",
    update: "/api/v1/auth/unit/update",
    delete: "/api/v1/auth/unit/delete",
  },

  shifts: {
    getList: "/api/v1/auth/shifts",
    get: "/api/v1/auth/shift",
    addNew: "/api/v1/auth/shift/add-new",
    update: "/api/v1/auth/shift/update",
    delete: "/api/v1/auth/shift/delete",
  },

  employees: {
    getList: "/api/v1/auth/employees",
    get: "/api/v1/auth/employee",
    addNew: "/api/v1/auth/employee/add-new",
    update: "/api/v1/auth/employee/update",
    delete: "/api/v1/auth/employee/delete",
  },

  attendances: {
    getList: "/api/v1/auth/attendances",
    get: "/api/v1/auth/attendance",
    addNew: "/api/v1/auth/attendance/add-new",
    update: "/api/v1/auth/attendance/update",
    delete: "/api/v1/auth/attendance/delete",
  },

  holidays: {
    getList: "/api/v1/auth/holidays",
    get: "/api/v1/auth/holiday",
    addNew: "/api/v1/auth/holiday/add-new",
    update: "/api/v1/auth/holiday/update",
    delete: "/api/v1/auth/holiday/delete",
  },

  auth: {
    login: "/api/v1/auth/login",
    logout: "/api/v1/auth/logout",
  },
};

module.exports = { customFrontendRoutes, customBackendRoutes };
