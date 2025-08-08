// pages/auth/verify-code.tsx
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyCodePage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval!);
  }, [resendDisabled]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    setTimer(60);
    setResendDisabled(true);
    console.log("Verification code resent!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      console.log("Code verified:", fullCode);
      router.push("/auth/reset-password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Verify Code
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the 6-digit code we sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-between gap-2 mb-3">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputsRef.current[index] = el!;
                }}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={code.some((c) => !c)}
            sx={{
              backgroundColor: "#16a34a",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#15803d",
              },
            }}
          >
            Verify
          </Button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          {resendDisabled ? (
            <span>
              Resend code in <span className="font-medium">{timer}s</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-green-600 hover:underline font-medium"
            >
              Resend Code
            </button>
          )}
        </div>

        <div className="mt-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-green-600 hover:underline"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
