import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import teacherModel from "../../models/teacherModel.js";
import bcrypt from "bcrypt";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body || {};

    if (!name || name == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }

    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "email"));
    }

    let isPasword = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    );

    if (!isPasword) {
      return send(res, setErrMsg(RESPONSE.INVALID, "password"));
    }
    let isEmailAlreadyExist = await teacherModel.findOne({ email: email });

    if (isEmailAlreadyExist) {
      return send(res, setErrMsg(RESPONSE.EXIST, "email"));
    }

    // console.log({ ...req.body });
    let encryptedPassword = await bcrypt.hash(password, 10);
    await teacherModel.create({
      ...req.body,
      password: encryptedPassword,
    });

    // console.log(encryptedPassword);
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Register", error);
  }
});
