import { useEffect, useRef, useState } from "react";

export default function SlideCaptchaModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [value, setValue] = useState(0);
  const [verified, setVerified] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      setValue(0);
      setVerified(false);
    }
  }, [open]);

  useEffect(() => {
    if (value >= 99 && !verified) {
      setVerified(true);
      setTimeout(() => {
        onSuccess();
      }, 350);
    }
  }, [value, verified, onSuccess]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/60">
      <div className="w-[560px] max-w-[92vw] rounded-xl bg-[#111827] text-white shadow-2xl border border-white/10">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-[15px] font-semibold">Slide to verify</h3>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-white/60 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-white/80 mb-4">
            Drag the slider to the end to confirm you’re human.
          </p>

          <div className="relative w-full">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full cursor-pointer accent-emerald-500"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-white/70">
              <span>{value < 99 ? "Slide to verify" : "Verified"}</span>
              <span>{Math.min(100, Math.round(value))}%</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-white/15 text-sm hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
