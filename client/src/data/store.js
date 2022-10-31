import { applyMiddleware } from "redux";

import { legacy_createStore as createStore } from "redux";
//import { configureStore } from "./app/store";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const intialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
