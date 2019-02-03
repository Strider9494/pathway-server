import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});

export default userSchema;
