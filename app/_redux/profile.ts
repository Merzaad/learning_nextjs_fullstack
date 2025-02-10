import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Profile {
  firstname: string;
  lastname: string;
  userId: number;
}
export interface ProfileSlice {
  data: Profile;
  isLoggedIn: boolean;
}

const initialState: ProfileSlice = {
  data: {
    firstname: "John",
    lastname: "Doe",
    userId: 0,
  },
  isLoggedIn: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.data.firstname = action.payload.firstname;
      state.data.lastname = action.payload.lastname;
      state.data.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.data;
export const selectIsLoggedIn = (state: RootState) => state.profile.isLoggedIn;

export default profileSlice.reducer;
