import mongoose, { model, Schema } from "mongoose";
import { DB_URL } from "./config";
mongoose.connect(DB_URL);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("users", UserSchema);

const ContentSchema = new Schema({
  title: { type: String },
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = model("contents", ContentSchema);

const LinkSchema = new Schema({
  hash: { type: String },
  userId: {type: mongoose.Types.ObjectId, ref: 'users', required: true, unique: true }
})
export const LinkModel = model('links', LinkSchema);