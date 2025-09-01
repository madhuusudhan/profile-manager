import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../stateStore/store";
import { ProfileSchema, type profileForm } from "../schemas/profileSchema";
import { updateProfileAsync, deleteProfileAsync } from "../stateStore/profileThunks";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AutohideSnackbar from "./Snackbar";


export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [form, setForm] = useState<profileForm>(profile);
  const [errors, setErrors] = useState<Partial<Record<keyof profileForm, string>>>({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      setForm(JSON.parse(storedProfile));
    }
  }, []);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = ProfileSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof profileForm, string>> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0];
        if (typeof path === "string") {
          fieldErrors[path as keyof profileForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      const response = await dispatch(updateProfileAsync(form)).unwrap();
    
      setErrors({});
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      localStorage.setItem("profileData", JSON.stringify(response.data));
      setIsReadOnly(true);
    } catch (error) {

      const err = error as { status: "error"; message: string; data: null };
      console.error("Error in updating the Information", err);
      setSnackbarMessage(err.message);
      setSnackbarOpen(true);
      setError(true);
    }
    

  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {

    try {
      const response = await dispatch(deleteProfileAsync()).unwrap();
        setForm({ name: "", email: "", age: undefined });
        setErrors({});
        setOpenDeleteDialog(false);
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
        setError(true);
        localStorage.removeItem("profileData");
      
    } catch (error) {
      const err = error as { status: "error"; message: string; data: null };
      console.error("Error in deleting the profile", err);
      setSnackbarMessage(err.message);
      setSnackbarOpen(true);
      setError(true);
    }
  };

  const cancelDelete = () => setOpenDeleteDialog(false);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Profile
        </Typography>

        {form.name && (
          <>
            <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56, mb: 1 }}>
              {getInitials(form.name)}
            </Avatar>
            <Typography variant="h6">{form.name}</Typography>
          </>
        )}

        

        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          InputProps={{ readOnly: isReadOnly }}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          InputProps={{ readOnly: isReadOnly }}
        />

        <TextField
          label="Age"
          name="age"
          type="number"
          value={form.age ?? ""}
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
          fullWidth
          InputProps={{ readOnly: isReadOnly }}
        />

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {!isReadOnly && (
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          )}
          <Button onClick={() => setIsReadOnly(!isReadOnly)}>
            {isReadOnly ? "EDIT" : "CANCEL"}
          </Button>
          <Button type="button" onClick={handleDelete} variant="outlined" color="secondary">
            DELETE
          </Button>
        </Box>
      </Box>

      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AutohideSnackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity={error != true ? "success": "error" }
      />
    </>
  );
}
