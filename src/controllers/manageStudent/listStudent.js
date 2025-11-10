import { Router } from "express";
import StudentModel from "../../models/StudentModel.js";
import { STATE } from "../../config/constant.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import authenticate from "../../middlewares/authenticate.js";
const router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    let student_id = req.query.student_id;

    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 10;

    let query = {
      isactive: STATE.ACTIVE,
      name: {
        $regex: req.query.searchKey ?? "",
        $options: "i",
      },
      teacher_id: req.token.id,
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

    studentData = studentData.map((itm) => {
      return {
        ...itm.toJSON(),
        image: itm.image ? "/uploads/" + itm.image : null,
      };
    });

    let totalcount = await StudentModel.countDocuments(query);

    return send(res, RESPONSE.SUCCESS, studentData, {
      totalcount: totalcount,
      currentpage: page,
      totalpage: Math.ceil(totalcount / limit),
    });
  } catch (error) {
    console.log("List Student:", error);
  }
});
