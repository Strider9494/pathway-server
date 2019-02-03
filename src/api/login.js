import "@babel/polyfill";
import { Router } from "express";
import joi from "joi";
import { compareSync } from "bcryptjs";
import schema from "./schemas/logSchema";

export default User => {
  let router = Router();
  router.post("/", async (req, res) => {
    const userParams = req.body.userParams;
    const result = joi.validate(userParams, schema);
    if (result.error) {
      console.log(result.error);
      res.status(403).json({ log: false, reason: "Invalid login or password" });
      return;
    }
    const user = await User.findOne({ email: userParams.email.toLowerCase() });
    console.log(user);
    if (user && compareSync(userParams.password, user.password)) {
      const userResponse = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
        date: user.date
      };
      res.status(200).json({ log: true, userResponse });
    } else {
      return res
        .status(403)
        .json({ log: false, reason: "Invalid login or password" });
    }
  });
  return router;
};
