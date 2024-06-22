import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice.ts";

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

export default store;
