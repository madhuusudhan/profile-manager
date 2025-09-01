import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../stateStore/store";
import { ProfileSchema, type profileForm} from "../schemas/profileSchema";
import { TextField, Button, Box, Typography } from "@mui/material";
import AutohideSnackbar from "./Snackbar";
import { useNavigate } from "react-router-dom";
import { type ApiResponse } from "../schemas/apiResponse";
import { createProfileAsync } from "../stateStore/profileThunks";
export default function ProfileForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [form, setForm] = useState<profileForm>({
      name: "",
      email: "",
      age: undefined,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof profileForm, string>>>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);

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
          const response = await dispatch(createProfileAsync(form)).unwrap();
        
          
          setForm({ name: "", email: "", age: undefined });
          setErrors({});
          setSnackbarMessage(response.message);
          setSnackbarOpen(true);
          localStorage.setItem("profileData", JSON.stringify(response.data));
          setTimeout(() => navigate("/profile"), 2000);
        
        } catch (err) {
          const error = err as ApiResponse<profileForm>; 
          console.error("Profile creation failed:", error);
        
          setError(true);
          setSnackbarMessage(error.message || "Something went wrong");
          setSnackbarOpen(true);
        }
        
        
    };
    const handleClear = () => {
      setForm({ name: "", email: "", age: undefined });
      setErrors({});
    }

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
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Profile Form
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
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
          />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => handleClear()}>
              CLEAR
            </Button>
          </Box>
        </Box>
        <AutohideSnackbar
            message={snackbarMessage}
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            severity={error != true ? "success": "error" }
        />
        </>
    );
}
