import { createAsyncThunk } from "@reduxjs/toolkit";
import profileController from "../api/profileController";
import { type profileForm } from "../schemas/profileSchema";
import { type ApiResponse } from "../schemas/apiResponse";

export const createProfileAsync = createAsyncThunk<
  ApiResponse<profileForm>, 
  profileForm,              
  { rejectValue: ApiResponse<profileForm> }
>(
  "profile/create",
  async (data, { rejectWithValue }) => {
    const response = await profileController.createProfile(data);
    if (response.status === "success") return response;
    return rejectWithValue(response);
  }
);

export const updateProfileAsync = createAsyncThunk<
  ApiResponse<profileForm>,
  profileForm,
  { rejectValue: ApiResponse<profileForm> }
>(
  "profile/update",
  async (data, { rejectWithValue }) => {
    const response = await profileController.updateProfile(data);
    if (response.status === "success") return response;
    return rejectWithValue(response);
  }
);

export const deleteProfileAsync = createAsyncThunk<
  ApiResponse<null>,
  void,
  { rejectValue: ApiResponse<null> }
>(
  "profile/delete",
  async (_, { rejectWithValue }) => {
    const response = await profileController.deleteProfile();
    if (response.status === "success") return response;
    return rejectWithValue(response);
  }
);


export const fetchProfileAsync = createAsyncThunk<
  ApiResponse<profileForm>,
  void,
  { rejectValue: ApiResponse<profileForm> }
>(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    const response = await profileController.getInfo();
    if (response.status === "success") return response;
    return rejectWithValue(response);
  }
);
