import { createSelector } from "reselect";
import { WorkspaceStore } from "./types";

type State = { workspace: WorkspaceStore };

const getMainState = (state: State) => state.workspace;
const getUser = createSelector(getMainState, (workspace) => workspace.user);
const getFeeds = createSelector(getMainState, (workspace) => workspace.feeds);

export default {
  getUser,
  getFeeds,
};
