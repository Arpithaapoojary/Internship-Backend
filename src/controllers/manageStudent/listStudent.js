import { Router } from "express";
import StudentModel from "../../models/StudentModel.js";
import { STATE } from "../../config/constant.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 2;

    let query = {
      isactive: STATE.ACTIVE,
      name: {
        $regex: req.query.searchKey ?? "",
        $options: "i",
      },
    };

    student_id != undefined ? (query._id = student_id) : "";
    let studentData = await StudentModel.find(
      query,

      {
        isactive: 0,
        __v: 0,
      }
    )
      .skip((page - 1) * limit)
      .limit(limit);

    // let studentData = await StudentModel.aggregate([
    //   {
    //     $match: {
    //       isactive: STATE.ACTIVE,
    //     },
    //   },

    //   {
    //     $project: {
    //       isactive: 0,
    //       __v: 0,
    //     },
    //   },
    // ]);

    if (studentData.length == 0) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "students"));
    }

    return send(res, RESPONSE.SUCCESS, studentData);
  } catch (error) {
    console.log("List Student:", error);
  }
});
