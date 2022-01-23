import { Payload } from "types";
import { cloneDeep } from "lodash";
import types, { WorkspaceStore } from "./types";

export const initialValues: WorkspaceStore = {
  user: null,
  feeds: [],
};

export default function (
  state: WorkspaceStore = initialValues,
  { type, payload }: Payload
) {
  switch (type) {
    case types.SET_USER:
      return {
        ...state,
        user: payload,
      };
    case types.SET_FEEDS:
      return {
        ...state,
        feeds: payload,
      };
    case types.ADD_FEED:
      return {
        ...state,
        feeds: [payload, ...state.feeds],
      };
    case types.CLEAR_WORKSPACE:
      return cloneDeep(initialValues);
    default:
      return state;
  }
}
