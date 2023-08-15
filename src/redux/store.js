import { createStore } from "redux";
import { combineReducers } from "redux";
import searchReducer from "./reducers/searchReducer.jsx";
import { masterReducers } from "./reducers/index.jsx";

const masterReducer = combineReducers({
  search: searchReducer,
});

const store = createStore(masterReducer);

export default store;
