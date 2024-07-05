import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  user: Object | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: '',
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInAction: (state: AuthState, action) => {
      (state.user = action.payload), (state.isLoggedIn = true);
    },
    logOutAction: state => {
      (state.user = null), (state.isLoggedIn = false);
    },
  },
});

// Action creators are generated for each case reducer function
export const {signInAction, logOutAction} = authSlice.actions;

export default authSlice.reducer;
