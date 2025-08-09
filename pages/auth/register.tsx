// pages/auth/register.tsx
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import CaptchaModal from "@/components/CaptchaModal";
import { saveUser, setVerified } from "@/lib/auth";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = useMemo(() => {
    const okEmail = /\S+@\S+\.\S+/.test(form.email);
    return (
      form.username.trim().length >= 2 &&
      okEmail &&
      form.password.length >= 6 &&
      form.password === form.confirmPassword
    );
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValid) {
      if (!/\S+@\S+\.\S+/.test(form.email)) setError("Enter a valid email.");
      else if (form.password.length < 6)
        setError("Password must be at least 6 characters.");
      else if (form.password !== form.confirmPassword)
        setError("Passwords do not match.");
      else setError("Please complete all fields.");
      return;
    }

    // Open the human verification modal
    setShowCaptcha(true);
  };

  const handleCaptchaSuccess = () => {
    const avatarInitial = (
      form.email?.trim()[0] ||
      form.username?.trim()[0] ||
      "U"
    ).toUpperCase();

    // Pretend-account create (local only)
    saveUser({
      username: form.username.trim(),
      email: form.email.trim(),
      avatarInitial,
      createdAt: new Date().toISOString(),
    });
    setVerified(true);

    router.push("/main");
  };

  return (
    <>
      <CaptchaModal
        open={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onSuccess={handleCaptchaSuccess}
      />

      <AuthLayout
        leftTitle="Get Started"
        leftSubtitle="Create a new account, fast and easy."
        leftImage="/assets/register-illustration.png"
        rightTopText="Already have an account?"
        rightTopLink="/auth/login"
        rightTopLinkText="Login"
      >
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-[22px] md:text-2xl font-semibold text-gray-900 mb-1">
            Get started in few steps.
          </h2>
          <p className="text-sm text-gray-500 mb-6">We need some information</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <TextField
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiUser className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  height: "48px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
                mt: 2,
              }}
            />

            {/* Email */}
            <TextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
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
                  height: "48px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
                mt: 2,
              }}
            />

            {/* Password */}
            <TextField
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
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
                  height: "48px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
                mt: 2,
              }}
            />

            {/* Confirm Password */}
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
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
                  height: "48px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
                mt: 2,
              }}
            />

            {error && <p className="text-sm text-red-600 -mt-2">{error}</p>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValid}
              sx={{
                backgroundColor: isValid ? "#16a34a" : "rgba(22,163,74,0.5)",
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: "600",
                height: "45px",
                "&:hover": {
                  backgroundColor: "#15803d",
                },
                mt: 2,
              }}
            >
              Register
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4">
              By registering, you agree to our{" "}
              <Link href="#" className="text-green-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-green-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
