import { UserInfo } from 'firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { Role } from '@prepa-sn/shared/enums';

export type User = UserInfo & { roles: Role[] };

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
      state.infos = action.payload;
    },
    updateUser: (state: UserInitialState, action) => {
      state.infos = { ...(state.infos || {}), ...(action.payload || {}) };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
const { reducer } = userSlice;
export default reducer;
