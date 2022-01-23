import { User } from "./user";

export type Feed = {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  createdBy?: User;
};
