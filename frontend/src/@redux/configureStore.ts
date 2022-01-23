import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import workspaceReducer from "./workspace/reducers";

const configureStore = (initialState = {}) => {
  const reducers = combineReducers({
    workspace: workspaceReducer,
  });

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware())
  );

  return { store };
};

export default configureStore;
