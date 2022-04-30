import { UserInfo } from 'firebase/auth';
import { createSlice } from '@reduxjs/toolkit';

export interface UserInitialState {
  infos: UserInfo | null;
}

const initialState: UserInitialState = {
  infos: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserInitialState, action) => {
      state.infos = action.payload as UserInfo;
    },
    updateUser: (state: UserInitialState, action) => {
      state.infos = { ...(state.infos || {}), ...action.payload };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
const { reducer } = userSlice;
export default reducer;
