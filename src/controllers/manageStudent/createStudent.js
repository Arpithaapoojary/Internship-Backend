import { Router } from "express";
import StudentModel from "../../models/StudentModel.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};

    if (!name || name == undefined) {
      return res.send({
        message: "name is undefined",
      });
    }

    if (!rollno || rollno == undefined) {
      return res.send({
        message: "rollno is undefined",
      });
    }

    if (!email || email == undefined) {
      return res.send({
        message: "email is undefined",
      });
    }

    let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!isEmail) {
      return res.send({
        message: "email is invalid",
      });
    }

    let studentRollno = await StudentModel.findOne({ rollno: rollno });
    // console.log({ ...req.body });
    // console.log(name);

    // await StudentModel.create({
    //   name,
    //   rollno,
    //   email,
    // });

    return res.send({
      message: "Ok",
    });
  } catch (error) {
    console.log("Err", error);
  }
});
