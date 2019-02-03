import mongoose from "mongoose";
import userSchema from "./schemas/userSchema";

export default callback => {
  mongoose.connect(
    "mongodb+srv://pathway-server:1068110000@cluster0-ogg5h.mongodb.net/pathway?retryWrites=true",
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
