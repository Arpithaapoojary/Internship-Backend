export const send = (res, response, data = {}) => {
  return res.send({
    message: response.message,
    code: response.code,
    data: data,
  });
};

export const setErrMsg = (response, param) => {
  return {
    code: response.code,
    message: `${param} ${response.message}`,
  };
};
