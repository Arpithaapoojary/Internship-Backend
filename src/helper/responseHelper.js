export const send = (res, response, data = {}, pageData = {}) => {
  return res.send({
    message: response.message,
    code: response.code,
    data: data,
    pageData: pageData,
  });
};

export const setErrMsg = (response, param) => {
  return {
    code: response.code,
    message: `${param} ${response.message}`,
  };
};
