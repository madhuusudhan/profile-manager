import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../stateStore/store";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import profileController from "../api/profileController";
import { updateProfile } from "../stateStore/profileSlice";

export default function ProfilePage() {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const loadProfile = async () => {
      const cachedData = localStorage.getItem("profileData");

      if (cachedData) {
        dispatch(updateProfile(JSON.parse(cachedData)));
      } else {
        try {
          const result = await profileController.getInfo();
          if (result?.data) {
            dispatch(updateProfile(result.data));
            localStorage.setItem("profileData", JSON.stringify(result.data));
          }
        } catch (err) {
          console.error("Failed to load profile:", err);
        }
      }
    };

    loadProfile();
  }, [dispatch, profile]);
  
  
  if (!profile.name) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 2,
          mx: "auto",
          mt: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">
          You do not have any profile stored.
        </Typography>
        <MuiLink component={Link} to="/profile-form" variant="h6" color="primary">
          Create Profile
        </MuiLink>
      </Box>
    );
  }
  return <Profile />;
}
