import { Router } from "express";
import { RESPONSE } from "../../config/global";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    //
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Login", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
