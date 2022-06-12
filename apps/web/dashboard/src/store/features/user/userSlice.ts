import { UserInfo } from 'firebase/auth';
import { createSlice } from '@reduxjs/toolkit';

export type User = UserInfo & { roles: string[] };

export interface UserInitialState {
  infos: User | null;
}

const initialState: UserInitialState = {
  infos: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserInitialState, action) => {
      state.infos = action.payload as User;
    },
    updateUser: (state: UserInitialState, action) => {
      state.infos = { ...(state.infos || {}), ...action.payload };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
const { reducer } = userSlice;
export default reducer;
