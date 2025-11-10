import createStudent from "./src/controllers/manageStudent/createStudent.js";
import listStudent from "./src/controllers/manageStudent/listStudent.js";
import deleteStudent from "./src/controllers/manageStudent/deleteStudent.js";
import updateStudent from "./src/controllers/manageStudent/updateStudent.js";
import register from "./src/controllers/auth/register.js";
import login from "./src/controllers/auth/login.js";

const router = (app) => {
  app.use("/api/student/create", createStudent);
  app.use("/api/student/list", listStudent);
  app.use("/api/student/delete", deleteStudent);
  app.use("/api/student/updates", updateStudent);

  //auth
  app.use("/api/auth/register",register)
  app.use("/api/auth/login",login)
};

export default router;
