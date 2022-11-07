import { combineReducers } from "@reduxjs/toolkit";
import { usersReducers } from "./UsersReducers";
import { groupReducer } from "./GroupReducer";

const rootReducer = combineReducers({
  users: usersReducers,
  group: groupReducer,
});

export default rootReducer;
