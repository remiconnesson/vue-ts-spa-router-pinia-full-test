import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { today, thisWeek, thisMonth } from "../posts";
import type { Post } from "../posts";
import type { NewUser, User } from "../users";

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/posts", (req, res) => {
  res.json(allPosts);
});

app.post<never, Post, Post>("/posts", (req, res) => {
  const id = (Math.random() * 100000).toFixed();
  const post = { ...req.body, id: id };
  allPosts.push(post);
  res.json(post);
});

const SECRET = "dqsdqs";
const COOKIE = "demo-spa-vue";

function authenticate(id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: "moimoimoi",
    expiresIn: "1 day",
  });
  res.cookie(COOKIE, token, { httpOnly: true });
}

app.post<never, Omit<User, "password">, NewUser>("/users", (req, res) => {
  // push new user in DB
  const id = (Math.random() * 100000).toFixed();
  const user: User = { ...req.body, id: id };
  allUsers.push(user);
  // authenticate the new user by giving them a cookie
  authenticate(id, req, res);
  // extract password before returning the new user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user; // here password is declared to be extracted
  res.json(userWithoutPassword);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
