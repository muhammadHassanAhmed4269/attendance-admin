const APIResponse = require("../../utilities/api-response");

const apiResponseHelper = (res, status, message, data) => {
  const apiResponse = new APIResponse(res);
  return apiResponse.sendResponse(status, message, data);
};

module.exports = apiResponseHelper;
