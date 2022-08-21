import express from "express";
import cors from "cors";
import { today, thisWeek, thisMonth } from "../posts";
import type { Post } from "../posts";
import type { NewUser, User } from "../users";

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

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

app.post<never, Omit<User, "password">, NewUser>("/users", (req, res) => {
  // push new user in DB
  const id = (Math.random() * 100000).toFixed();
  const user: User = { ...req.body, id: id };
  allUsers.push(user);
  // extract password before returning the new user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user; // here password is declared to be extracted
  res.json(userWithoutPassword);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
