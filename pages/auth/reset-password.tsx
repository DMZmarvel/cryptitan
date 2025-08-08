// pages/auth/reset-password.tsx
import { useState } from "react";
import Link from "next/link";
import { TextField, InputAdornment, Button } from "@mui/material";
import { FiLock } from "react-icons/fi";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // ✅ Simulate password reset
    console.log("Password reset:", password);
    localStorage.removeItem("email"); // clean up
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Reset your password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your new password to complete the reset.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiLock className="text-gray-500" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#fff",
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiLock className="text-gray-500" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#fff",
              },
              mt: 2,
            }}
          />

          {error && <p className="text-red-600 text-sm text-left">{error}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#16a34a",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#15803d",
              },
              mt: 2,
            }}
          >
            Reset Password
          </Button>
        </form>

        <div className="mt-4">
          <Link
            href="/auth/login"
            className="text-sm  text-green-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
