import { Feed, User } from "types";

export default {
  SET_USER: "SET_USER",
  SET_FEEDS: "SET_FEEDS",
  ADD_FEED: "ADD_FEED",
  CLEAR_WORKSPACE: "CLEAR_WORKSPACE",
};

export type WorkspaceStore = {
  user: User | null;
  feeds: Feed[];
};
