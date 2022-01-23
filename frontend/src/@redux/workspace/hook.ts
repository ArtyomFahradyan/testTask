import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { User, Dispatch, Feed } from "types";
import types from "./types";

/**
 * Main action dispatcher
 * see react-redux examples: https://react-redux.js.org/api/hooks#examples
 */
export default function () {
  const dispatch: Dispatch = useDispatch();

  const setUser = useCallback(
    (payload: User) => {
      dispatch({ type: types.SET_USER, payload });
    },
    [dispatch]
  );

  const setFeeds = useCallback(
    (payload: Feed[]) => {
      dispatch({ type: types.SET_FEEDS, payload });
    },
    [dispatch]
  );

  const addFeed = useCallback(
    (payload: Feed) => {
      dispatch({ type: types.ADD_FEED, payload });
    },
    [dispatch]
  );

  const clearWorkspace = useCallback(() => {
    dispatch({ type: types.CLEAR_WORKSPACE });
  }, [dispatch]);

  return {
    setUser,
    setFeeds,
    addFeed,
    clearWorkspace,
  };
}
