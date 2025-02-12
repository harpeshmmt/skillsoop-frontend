import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import coutriesReducer from "../features/counter/commonSlice";
import snackbarReducer from "../features/counter/snackbarSlice";
import authReducer from "../features/counter/authSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    common: coutriesReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
