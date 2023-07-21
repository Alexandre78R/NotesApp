import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import users from "./users"
import notes from "./notes"

export default configureStore({
  reducer: { auth, users, notes },
});