import { Router } from "express";
import StudentModel from "../../models/StudentModel.js";
import { STATE } from "../../config/constant.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

export default router.get("/", async (requestAnimationFrame, res) => {
  try {
    // let studentData = await StudentModel.find(
    //   {
    //     isactive: STATE.ACTIVE,
    //   },
    //   {
    //     isactive: 0,
    //     __v: 0,
    //   }
    // );

    let studentData = await StudentModel.aggregate([
      {
        $match: {
          isactive: STATE.ACTIVE,
        },
      },

      {
        $project: {
          isactive: 0,
          __v: 0,
        },
      },
    ]);

    if (studentData.length == 0) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "students"));
    }

    return send(res, RESPONSE.SUCCESS, studentData);
  } catch (error) {
    console.log("List Student:", error);
  }
});
