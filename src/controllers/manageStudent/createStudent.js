import { Router } from "express";
import StudentModel from "../../models/StudentModel.js";
const router = Router();
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";

export default router.post("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};

    if (!name || name == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
    }

    if (!rollno || rollno == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "rollno"));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }

    let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "email"));
    }

    let studentRollno = await StudentModel.findOne({ rollno: rollno });

    if (studentRollno) {
      return send(res, setErrMsg(RESPONSE.EXIST, "rollno"));
    }
    // console.log({ ...req.body });
    // console.log(name);

    await StudentModel.create({
      name,
      rollno,
      email,
    });

    return res.send(RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Err", error);
  }
});
