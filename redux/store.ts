import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import postSlice from './postSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postSlice,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
