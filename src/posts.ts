import { DateTime } from "luxon";

export interface Post {
  id: string;
  title: string;
  author: string;
  created: string;
  markdown: string;
  html: string;
}

export interface TimelinePost extends Omit<Post, "created"> {
  created: DateTime;
}

export const today: Post = {
  id: "1",
  author: "-1",
  title: "Today",
  created: DateTime.now().toISO(),
  markdown: "",
  html: "",
};

export const thisWeek: Post = {
  id: "2",
  author: "-1",
  title: "This Week",
  created: DateTime.now().minus({ day: 6 }).toISO(),
  markdown: "",
  html: "",
};

export const thisMonth: Post = {
  id: "3",
  author: "-1",
  title: "This Month",
  created: DateTime.now().minus({ day: 27 }).toISO(),
  markdown: "",
  html: "",
};
