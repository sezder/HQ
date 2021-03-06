import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import projectReducer from "./project";
import listReducer from "./list";
import todoReducer from "./todo";
import session from "./session";
import messageReducer from "./message";
import commentReducer from "./comment";
import userReducer from "./user";
import projectAssignmentReducer from "./projectAssignment";

const rootReducer = combineReducers({
  session,
  projects: projectReducer,
  lists: listReducer,
  todos: todoReducer,
  messages: messageReducer,
  comments: commentReducer,
  users: userReducer,
  projectAssignments: projectAssignmentReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
