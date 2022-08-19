import { DateTime } from "luxon";

export interface Post {
  id: string;
  title: string;
  created: string;
  markdown: string;
}

export interface TimelinePost extends Omit<Post, "created"> {
  created: DateTime;
}

export const today: Post = {
  id: "1",
  title: "Today",
  created: DateTime.now().toISO(),
  markdown: "",
};

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  created: DateTime.now().minus({ day: 6 }).toISO(),
  markdown: "",
};

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  created: DateTime.now().minus({ day: 27 }).toISO(),
  markdown: "",
};
