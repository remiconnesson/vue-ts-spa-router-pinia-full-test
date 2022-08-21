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
  res.sendStatus(201);
});

app.put<never, Post, Post>("/posts", (req, res) => {
  const post = req.body;
  const index = allPosts.findIndex((x) => x.id === post.id);

  // TODO : authenticate
  // TODO : id tempering

  if (index === -1) {
    throw Error(`Post with id ${post.id} was not found`);
  }

  allPosts[index] = post;

  res.sendStatus(201);
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

app.post<never, never, NewUser>("/login", (req, res) => {
  const targetUser = allUsers.find((x) => x.username === req.body.username);

  if (!targetUser || targetUser.password !== req.body.password) {
    res.sendStatus(401);
  } else {
    authenticate(targetUser.id, req as Request, res as Response);
    res.sendStatus(200);
  }
});

app.post("/logout", (req, res) => {
  res.cookie(COOKIE, "", { httpOnly: true });
  res.sendStatus(200);
});

app.get("/current-user", (req, res) => {
  try {
    const token = req.cookies[COOKIE];
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };
    res.json({ id: result.id });
  } catch (e) {
    res.sendStatus(404);
  }
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
