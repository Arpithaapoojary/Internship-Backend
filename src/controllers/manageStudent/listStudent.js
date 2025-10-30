import { Router } from "express";
import StudentModel from "../../models/StudentModel";
import { STATE } from "../../config/constant";
const router = Router();

export default router.get("/", async (requestAnimationFrame, res) => {
  try {
    let studentData = await StudentModel.find({
      isactive: STATE.ACTIVE,
    });
  } catch (error) {
    console.log("List Student:", error);
  }
});
