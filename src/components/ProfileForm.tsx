import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../stateStore/store";
import { updateProfile, clearProfile } from "../stateStore/profileSlice";
import { ProfileSchema, type profileForm} from "../schemas/profileSchema";
import { TextField, Button, Box, Typography } from "@mui/material";
import AutohideSnackbar from "./Snackbar";
import { useNavigate } from "react-router-dom";
export default function ProfileForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
    const [form, setForm] = useState<profileForm>({
      name: "",
      email: "",
      age: undefined,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof profileForm, string>>>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "age" ? (value === "" ? undefined : Number(value)) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
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
        setForm({ name: "", email: "", age: undefined });
        setErrors({});
        dispatch(updateProfile(result.data));
        setSnackbarMessage("Profile updated successfully!");
        setSnackbarOpen(true);
        localStorage.setItem("profileData", JSON.stringify(result.data));
        setTimeout(() => {
          navigate('/profile'); 
        }, 2000);
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
        />
        </>
    );
}
