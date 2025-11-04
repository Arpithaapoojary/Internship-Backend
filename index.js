import express from "express";

const app = express();
import connectDB from "./src/helper/dbConnection.js";
import router from "./routes.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
import path from "path";
const _dirname = path.resolve();
console.log(_dirname);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(_dirname, "public")));

connectDB();
router(app);
app.listen(process.env.PORT, () => {
  console.log("server listening to PORT", process.env.PORT);
});
