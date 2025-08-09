import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { FiMail, FiLock } from "react-icons/fi";
import SlideCaptchaModal from "@/components/SlideCaptchaModal";
import { saveUser, setVerified } from "@/lib/auth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    // Open slide verification
    setShowCaptcha(true);
  };

  const handleCaptchaSuccess = () => {
    // Store “logged in” user in localStorage (visual/demo only)
    const usernameGuess = email.includes("@") ? email.split("@")[0] : "user";
    saveUser({
      username: usernameGuess,
      email,
      createdAt: new Date().toISOString(),
      avatarInitial: (email || usernameGuess).charAt(0).toUpperCase(),
    });
    setVerified(true);
    router.push("/main");
  };

  return (
    <>
      <SlideCaptchaModal
        open={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onSuccess={handleCaptchaSuccess}
      />

      <AuthLayout>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-[22px] md:text-2xl font-semibold text-gray-900 mb-2">
            Sign in to Cryptitan
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your details below.
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
                sx: { paddingY: "6px" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  height: "48px",
                },
                "& .MuiInputLabel-root": { fontSize: "14px" },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLock className="text-gray-500" />
                  </InputAdornment>
                ),
                sx: { paddingY: "6px" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  height: "48px",
                },
                "& .MuiInputLabel-root": { fontSize: "14px" },
                mt: 2,
              }}
            />

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            <div className="flex justify-between items-center">
              <FormControlLabel
                control={<Checkbox sx={{ color: "#16a34a" }} />}
                label={
                  <span className="text-sm text-gray-700">Remember me</span>
                }
                sx={{ marginLeft: 0 }}
              />
              <Link
                href="/auth/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#16a34a",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  height: "45px",
                  "&:hover": { backgroundColor: "#15803d" },
                }}
              >
                Login
              </Button>

              {/* Demo shortcut (kept) */}
              <Link href="/main" passHref>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: "600",
                    height: "45px",
                    color: "#111827",
                    borderColor: "#d1d5db",
                    "&:hover": {
                      backgroundColor: "#f9fafb",
                      borderColor: "#d1d5db",
                    },
                  }}
                >
                  Login As Demo
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
