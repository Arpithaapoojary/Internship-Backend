import { Router } from "express";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import teacherModel from "../../models/teacherModel.js";
import { STATE } from "../../config/constant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body || {};

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }

    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let userData = await teacherModel.findOne({
      email: email,
      isactive: STATE.ACTIVE,
    });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      let token = await jwt.sign(
        { id: userData._id, email: userData.email },
        process.env.JWT_SECRET,
        {
          //expiresIn: 60 * 60,
        }
      );
      return send(res, RESPONSE.SUCCESS, token);
    } else {
      return send(res, setErrMsg(RESPONSE.INVALID, "login credientials"));
    }
  } catch (error) {
    console.log("Login", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
