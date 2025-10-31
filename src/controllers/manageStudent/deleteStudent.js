import { Router } from "express";
import { send } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
const router = Router();

export default router.delete("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "student_id"));
    }
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Delete Student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
