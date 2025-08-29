import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  name: string;
  email: string;
  age?: number;
}

const initialState: ProfileState = (() => {
  const stored = localStorage.getItem("profileData");
  if (stored) {
    try {
      return JSON.parse(stored) as ProfileState;
    } catch {
      return { name: "", email: "", age: undefined };
    }
  }
  return { name: "", email: "", age: undefined };
})();

const profileSlice = createSlice({
  name: "profile", 
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.age !== undefined) {
        state.age = action.payload.age;
      }
    },
    clearProfile: () => initialState,
  },
});

export const { updateProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
