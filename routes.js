import createStudent from "./src/controllers/manageStudent/createStudent.js";
import listStudent from "./src/controllers/manageStudent/listStudent.js";
import deleteStudent from "./src/controllers/manageStudent/deleteStudent.js";
import updateStudent from "./src/controllers/manageStudent/updateStudent.js";

const router = (app) => {
  app.use("/api/student/create", createStudent);
  app.use("/api/student/list", listStudent);
  app.use("/api/student/delete", deleteStudent);
  app.use("/api/student/updates", updateStudent);
};

export default router;
