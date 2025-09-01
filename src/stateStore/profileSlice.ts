import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createProfileAsync, updateProfileAsync, deleteProfileAsync, fetchProfileAsync } from "./profileThunks";

export interface ProfileState {
  name: string;
  email: string;
  age?: number;
  error: string | null;
}

const initialState: ProfileState = {
  name: "",
  email: "",
  age: undefined,
  error: null
}

const profileSlice = createSlice({
  name: "profile", 
  initialState,
  reducers: {
    updateProfileFromCache: (state, action: PayloadAction<ProfileState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProfileAsync.pending, (state) => {
      state.error = null;
    });

    builder.addCase(createProfileAsync.fulfilled, (state, action) => {
      state.error = null;
      return { ...state, ...action.payload };
    });

    builder.addCase(createProfileAsync.rejected, (state, action) => {
      state.error = action.payload?.message as string;
    });

    builder.addCase(updateProfileAsync.pending, (state) => {
      state.error = null;
    });

    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      state.error = null;
      return { ...state, ...action.payload };
    });

    builder.addCase(updateProfileAsync.rejected, (state, action) => {
      state.error = action.payload?.message as string;
    });

    builder.addCase(deleteProfileAsync.fulfilled, () => initialState);

    builder.addCase(deleteProfileAsync.rejected, (state, action) => {
      state.error = action.payload?.message as string;
    });

    builder.addCase(fetchProfileAsync.pending, (state) => {
      state.error = null;
    });
    
    builder.addCase(fetchProfileAsync.fulfilled, (state, action) => {
      state.error = null;
      return { ...state, ...action.payload };
    });

    builder.addCase(fetchProfileAsync.rejected, (state, action) => {
      state.error = action.payload?.message as string;
    });
  }
});

export const { updateProfileFromCache } = profileSlice.actions;
export default profileSlice.reducer;
