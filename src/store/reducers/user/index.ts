import { createSlice } from '@reduxjs/toolkit';

import { removeUserAction, setUserAction } from './actions';
import initialState from './initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: setUserAction,
    removeUser: removeUserAction,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
