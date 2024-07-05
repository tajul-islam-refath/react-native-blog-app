import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  posts: [],
  singlePost: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postsAction: (state, action) => {
      state.posts = action.payload;
    },
    signlePostAction: (state, action) => {
      state.singlePost = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {signlePostAction, postsAction} = postSlice.actions;

export default postSlice.reducer;
