import express from "express";
import cors from "cors";
import { today, thisWeek, thisMonth } from "../posts";
import type { Post } from "../posts";

const allPosts = [today, thisWeek, thisMonth];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.json(allPosts);
});

app.post<never, Post, Post>("/posts", (req, res) => {
  const id = (Math.random() * 100000).toFixed();
  const post = { ...req.body, id: id };
  allPosts.push(post);
  res.json(post);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
