export const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
  UNKNOWN_ERR: {
    code: 500,
    message: "Something went wrong",
  },

  REQUIRED: {
    code: 201,
    message: "is required",
  },

  NOT_FOUND: {
    code: 204,
    message: "not found",
  },

  INVALID: {
    code: 205,
    message: "invalid",
  },

  MULTER_ERR: {
    code: 265,
    message: "",
  },

  EXIST: {
    code: 202,
    message: "is already existed",
  },

  ACCESS_DENIED: {
    code: 211,
    message: "access denied",
  },
};
