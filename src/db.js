import mongoose from "mongoose";
import userSchema from "./schemas/userSchema";
import dotenv from 'dotenv';
dotenv.load();

export default callback => {
  mongoose.connect(
    `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0-ogg5h.mongodb.net/pathway?retryWrites=true`,
    { useNewUrlParser: true }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected");
    const User = mongoose.model("User", userSchema);
    callback(User);
  });
};
