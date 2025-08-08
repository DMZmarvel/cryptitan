// pages/auth/forgot-password.tsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TextField, InputAdornment, Button } from "@mui/material";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Simulate sending reset code
    console.log("Send reset code to:", email);

    // ✅ Store email in localStorage
    localStorage.setItem("email", email);

    // ✅ Navigate to next step (verify-code or reset-password)
    router.push("/auth/verify-code"); // or "/auth/reset-password"
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter the email address associated with your account to get a
          verification code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiMail className="text-gray-500" />
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
            Send Code
          </Button>
        </form>

        <div className="mt-4">
          <Link
            href="/auth/login"
            className="text-sm text-green-600 hover:underline font-medium"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
