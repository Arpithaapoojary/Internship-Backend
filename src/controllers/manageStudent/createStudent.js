import { Router } from "express";
import StudentModel from "../../models/StudentModel.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};

    console.log({ ...req.body });
    // console.log(name);

    await StudentModel.create({
      name,
      rollno,
      email,
    });

    return res.send({
      message: "Ok",
    });
  } catch (error) {
    console.log("Err", error);
  }
});
