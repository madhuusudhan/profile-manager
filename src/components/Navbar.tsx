import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Tooltip, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { type RootState } from "../stateStore/store";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  const profile = useSelector((state: RootState) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();

  const firstName = profile.name?.split(" ")[0] || "";
  const lastName = profile.name?.split(" ")[1] || "";

  const handleNavigation = () => {
    if (location.pathname === "/profile") navigate("/profile-form");
    else navigate("/profile");
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography 
          variant="h5" 
          sx={{ cursor: "pointer", fontWeight: 700, letterSpacing: 1.2 }}
          onClick={() => navigate("/")}
        >
          Profile Manager
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {profile.name && (
            <>
              <Tooltip title={`${firstName} ${lastName}`}>
                <Avatar sx={{ bgcolor: '#ff6f61', width: 40, height: 40, fontWeight: 600 }}>
                  {(firstName[0] || "") + (lastName[0] || "")}
                </Avatar>
              </Tooltip>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#fff" }}>
                {firstName} {lastName}
              </Typography>
            </>
          )}

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AccountCircleIcon />}
            onClick={handleNavigation}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: '#ff6f61',
              '&:hover': {
                backgroundColor: '#e55b4e',
              }
            }}
          >
            {location.pathname === "/profile" ? "Create Profile" : "View Profile"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
