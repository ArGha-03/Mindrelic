import express from "express";
const app = express();
app.use(express.json());

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { randomString } from "./utils";

import cors from "cors";
app.use(cors())

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await UserModel.create({ username, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username, password });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(403).json({ message: "Incorrect Credentials" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link, type } = req.body;
  // @ts-ignore
  const userId = req.userId;
  try {
    await ContentModel.create({ title, link, type, tags: [], userId });
    res.json({ message: "Content created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const { userId } = req;
  const contents = await ContentModel.find({ userId }).populate("userId", "username")
  res.json(contents);
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const { userId } = req;
  const { contentId } = req.body;
  try {
    await ContentModel.deleteOne({ _id: contentId, userId });
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/v1/mind/share", userMiddleware, async (req, res) => {
  const {share} = req.body;
  // @ts-ignore
  const { userId } = req;
  if(share){
    const existingLink = await LinkModel.findOne({ userId });
    const rand: string = randomString(10);
    if(existingLink) {
      await LinkModel.updateOne({ userId }, { hash: rand });
    } else {
      await LinkModel.create({ userId, hash: rand });
    }
    res.json({ message: rand });
  } else {
    await LinkModel.deleteOne({ userId });
    res.json({ message: "Mind share removed successfully" });
  }
});

app.get("/api/v1/mind/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({ hash});
  if(!link) {
    return res.status(411).json({ message: "Share link not found" });
  }
  const contents = await ContentModel.find({ userId: link.userId }).populate("userId", "username");
  res.json(contents);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
