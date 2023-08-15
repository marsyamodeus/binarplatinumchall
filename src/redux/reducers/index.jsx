import { combineReducers } from "redux";
import searchReducer from "./searchReducer";

export const masterReducers = combineReducers({
  search: searchReducer,
});
