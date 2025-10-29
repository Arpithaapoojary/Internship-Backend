import { response } from "express";

export const send = (res, response, data = {}) => {
  return res.send({
    message: response.message,
    code: response.code,
    data: data,
  });
};
