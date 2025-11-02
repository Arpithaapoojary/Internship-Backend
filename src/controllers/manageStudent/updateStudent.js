import { Router } from "express";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import StudentModel from "../../models/StudentModel.js";

const router = Router();

export default router.put("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};

    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "student_id"));
    }

    let updates = {};

    if (name && name != undefined) {
      updates.name = name;
    }

    if (rollno && rollno != undefined) {
      let studentData = await StudentModel.findOne({
        rollno: rollno,
        _id: { $ne: student_id },
      });

      if (studentData) {
        return send(res, setErrMsg(RESPONSE.EXIST, "rollno"));
      }
    }

    if (email && email != undefined) {
      let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

      if (!isEmail) {
        return send(res, setErrMsg(RESPONSE.INVALID, "email"));
      }

      updates.email = email;
    }
    await StudentModel.updateOne(
      {
        _id: student_id,
      },
      {
        $set: {
          isactive: updates,
        },
      }
    );

    // console.log(updates);

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Update student:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
