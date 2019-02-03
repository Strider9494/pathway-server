import "@babel/polyfill";
import { Router } from "express";
import bcrypt from "bcryptjs";
import Joi from "joi";
import schema from "./schemas/regSchema";

const salt = bcrypt.genSaltSync(10);

export default User => {
  let router = Router();
  router.post("/", async (req, res) => {
    const userParams = req.body.userParams;
    const result = Joi.validate(userParams, schema);
    if (result.error) {
      res.status(403).send(result.error.details[0].message);
      return;
    }
    const email = await User.findOne({ email: userParams.email });
    if (email) { 
      return res.status(500).json({ reg: false, reason: "This email is alredy exist" });
    }

    const newUser = new User({
      firstName: userParams.firstName,
      lastName: userParams.lastName,
      email: userParams.email.toLowerCase(),
      password: bcrypt.hashSync(userParams.password, salt)
    });

    await newUser.save(function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ reg: false, reason: "Serer error" });
      }
    });

    res.status(201).json({ reg: true });
  });
  return router;
};
