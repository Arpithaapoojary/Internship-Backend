import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import StudentModel from "../../models/StudentModel.js";
import { STATE } from "../../config/constant.js";
const router = Router();

export default router.delete("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "student_id"));
    }

    let studentData = await StudentModel.findOne({
      _id: student_id,
      isactive: STATE.ACTIVE,
    });

    if (!studentData) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "student_id"));
    }

    //  await StudentModel.deleteOne(
    //   {
    //     _id: student_id,
    //   });
 
    await StudentModel.updateOne(
      {
        _id: student_id,
      },
      {
        $set: {
          isactive: STATE.INACTIVE,
        },
      }
    );
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Delete Student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
