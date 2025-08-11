import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CaptchaModal({ open, onClose, onSuccess }: Props) {
  const [leftOk, setLeftOk] = useState(false);
  const [rightOk, setRightOk] = useState(false);

  useEffect(() => {
    if (open) {
      setLeftOk(false);
      setRightOk(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
      <div className="w-[720px] max-w-[90vw] bg-white rounded-xl shadow-xl p-5">
        <h3 className="text-center font-semibold mb-3">
          Please drag the pieces to complete the puzzle
        </h3>

        <div
          className="relative bg-[url('/assets/puzzle-bg.png')] bg-cover bg-center rounded-md border overflow-hidden mx-auto"
          style={{ width: 640, height: 320, maxWidth: "100%" }}
        >
          <div
            id="target-left"
            className={`absolute top-[58%] left-[36%] -translate-x-1/2 -translate-y-1/2 h-20 w-16 rounded-md border-2
              ${leftOk ? "border-green-500" : "border-gray-300"}
            `}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("text/plain");
              if (id === "piece-left") setLeftOk(true);
            }}
          />
          <div
            id="target-right"
            className={`absolute top-[58%] left-[63%] -translate-x-1/2 -translate-y-1/2 h-20 w-16 rounded-md border-2
              ${rightOk ? "border-green-500" : "border-gray-300"}
            `}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("text/plain");
              if (id === "piece-right") setRightOk(true);
            }}
          />

          <button
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("text/plain", "piece-left")
            }
            className="absolute bottom-4 left-4 h-20 w-16 rounded-md bg-gray-800 text-white text-xs grid place-items-center"
            aria-label="Move left piece"
          >
            ⇄ Move
          </button>

          <button
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("text/plain", "piece-right")
            }
            className="absolute bottom-4 left-24 h-20 w-16 rounded-md bg-gray-800 text-white text-xs grid place-items-center"
            aria-label="Move right piece"
          >
            ⇄ Move
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-md border border-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLeftOk(false);
                setRightOk(false);
              }}
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700"
              title="Reset puzzle"
            >
              ⟳
            </button>
            <button
              disabled={!(leftOk && rightOk)}
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className={`px-4 py-2 rounded-md font-semibold
                ${
                  leftOk && rightOk
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
