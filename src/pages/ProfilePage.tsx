import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../stateStore/store";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";

export default function ProfilePage() {
  const profile = useSelector((state: RootState) => state.profile);

  // If no profile exists
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
