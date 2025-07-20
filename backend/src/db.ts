import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb://localhost:27017/mindrelic");

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("users", UserSchema);

const ContentSchema = new Schema({
  title: { type: String },
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = model("contents", ContentSchema);
