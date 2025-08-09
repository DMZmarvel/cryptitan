// pages/main/payments.tsx
import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";

type Tx = {
  date: string;
  status: "Completed" | "Canceled";
  value: string;
  description: string;
};

const txs: Tx[] = [
  {
    date: "Aug 08",
    status: "Canceled",
    value: "$50.00",
    description: "(Mollie) tr_PkBuRyff...",
  },
  {
    date: "Jul 26",
    status: "Canceled",
    value: "$50.00",
    description: "(Mollie) tr_UM7nug...",
  },
  {
    date: "Jul 15",
    status: "Completed",
    value: "$145.00",
    description: "(Mollie) tr_39xQGB...",
  },
  {
    date: "Jun 19",
    status: "Canceled",
    value: "$50.00",
    description: "(Mollie) tr_9CWHgr...",
  },
];

function formatUSD(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}
function buildMonthlyData() {
  const points: { label: string; full: string; received: number }[] = [];
  const d = new Date();
  for (let i = 11; i >= 0; i--) {
    const dt = new Date(d.getFullYear(), d.getMonth() - i, 12);
    const label = dt.toLocaleString(undefined, { month: "short" });
    const full = dt.toLocaleDateString(undefined, {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    const received = i === 7 ? 35 : 0; // mock
    points.push({ label, full, received });
  }
  return points;
}

export default function PaymentsPage() {
  const totalAvailable = 3511.52;

  // timeline hover
  const monthlyData = useMemo(buildMonthlyData, []);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    setHoverX(x);
    const idx = Math.round((x / rect.width) * (monthlyData.length - 1));
    setHoverIdx(idx);
  };
  const handleLeave = () => {
    setHoverX(null);
    setHoverIdx(null);
  };

  // tabs + persistence
  const [tab, setTab] = useState<"withdraw" | "deposit">("withdraw");
  useEffect(() => {
    const saved = localStorage.getItem("paymentsTab");
    if (saved === "withdraw" || saved === "deposit") setTab(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("paymentsTab", tab);
  }, [tab]);

  // withdraw slider + persistence
  const [amount, setAmount] = useState<number>(50);
  useEffect(() => {
    const saved = localStorage.getItem("withdrawAmount");
    if (saved) setAmount(Number(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("withdrawAmount", String(amount));
  }, [amount]);

  // deposit link + persistence
  const [depositLink, setDepositLink] = useState<string>("");
  useEffect(() => {
    const saved = localStorage.getItem("depositLink");
    if (saved) setDepositLink(saved);
  }, []);
  const generateDepositLink = () => {
    const id = Math.random().toString(36).slice(2, 10).toUpperCase();
    const link = `${location.origin}/deposit/${id}`;
    setDepositLink(link);
    localStorage.setItem("depositLink", link);
  };
  const copyDepositLink = async () => {
    if (!depositLink) return;
    try {
      await navigator.clipboard.writeText(depositLink);
    } catch {
      // ignore
    }
  };

  return (
    <DashboardLayout>
      <div className="text-white space-y-6">
        {/* Title + crumbs */}
        <div>
          <h1 className="text-2xl font-semibold">Payments</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">Payments</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Balance card with hover timeline */}
            <div className="bg-[#c8f4d0]/95 text-[#0b1b14] rounded-xl p-0 overflow-hidden shadow">
              <div className="px-5 pt-5 pb-2">
                <div className="text-sm opacity-80">Available</div>
                <div className="text-3xl font-bold text-[#0b1b14]">
                  {formatUSD(totalAvailable)}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  $0.00 pending credit
                </div>
              </div>
              <div
                ref={timelineRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="relative mx-5 my-3 h-6 cursor-crosshair"
              >
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-green-600/60 rounded" />
                <div className="absolute inset-0 flex justify-between items-center">
                  {monthlyData.map((_, i) => (
                    <span
                      key={i}
                      className="w-[2px] h-3 bg-green-700/50 rounded-full"
                      style={{ opacity: i % 2 === 0 ? 0.55 : 0.25 }}
                    />
                  ))}
                </div>
                {hoverX !== null && (
                  <>
                    <div
                      className="absolute top-0 bottom-0 w-px bg-green-900/40"
                      style={{ left: hoverX }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-green-700 rounded-full shadow"
                      style={{ left: Math.max(0, hoverX - 6) }}
                    />
                  </>
                )}
                {hoverIdx !== null && (
                  <div
                    className="absolute -top-10 translate-x-[-50%] bg-[#0b1b14] text-white text-xs px-3 py-1.5 rounded-lg shadow border border-green-900/30"
                    style={{
                      left: `${(hoverIdx / (monthlyData.length - 1)) * 100}%`,
                    }}
                  >
                    <div>{monthlyData[hoverIdx].full}</div>
                    <div className="opacity-80">
                      Received: {formatUSD(monthlyData[hoverIdx].received)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Withdraw / Deposit card */}
            <div className="bg-[#1f2937] rounded-xl overflow-hidden shadow">
              {/* Tabs */}
              <div className="flex items-center">
                <button
                  onClick={() => setTab("withdraw")}
                  className={`flex-1 px-5 py-3 text-sm font-medium border-b-2 ${
                    tab === "withdraw"
                      ? "border-green-500"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Withdraw
                </button>
                <button
                  onClick={() => setTab("deposit")}
                  className={`flex-1 px-5 py-3 text-sm font-medium border-b-2 ${
                    tab === "deposit"
                      ? "border-green-500"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  Deposit
                </button>
              </div>

              {/* Withdraw body */}
              {tab === "withdraw" && (
                <div className="p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 tracking-wide">
                      BANK ACCOUNT
                    </span>
                    <button className="text-green-400 text-sm inline-flex items-center gap-1">
                      <FiEdit2 /> Edit
                    </button>
                  </div>
                  <div className="bg-[#0f1623] text-gray-200 rounded-lg px-4 py-3 border border-blue-900/40 shadow-inner">
                    <span className="text-sm">
                      You have not added a bank account.
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 tracking-wide mb-1">
                      ENTER AMOUNT
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-400 text-xs">USD</span>
                      <span className="text-3xl font-semibold">{amount}</span>
                    </div>
                    <div className="mt-3">
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        step={10}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full accent-green-600"
                      />
                      <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                        <span>0</span>
                        <span>1,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Your Balance</span>
                    <span className="font-semibold text-white">
                      {formatUSD(totalAvailable)}
                    </span>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg shadow">
                    Withdraw
                  </button>
                </div>
              )}

              {/* Deposit body */}
              {tab === "deposit" && (
                <div className="p-5 space-y-5">
                  <div className="text-sm text-gray-300">
                    Create a one‑time deposit link to fund your balance. (Demo
                    only — no backend.)
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 tracking-wide mb-1">
                      DEPOSIT LINK
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={depositLink || "—"}
                        disabled
                        className="flex-1 bg-[#0f1623] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300"
                      />
                      <button
                        onClick={copyDepositLink}
                        disabled={!depositLink}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          depositLink
                            ? "bg-[#111827] border border-gray-700 hover:bg-[#0f1623]"
                            : "bg-[#0f1623] border border-gray-800 opacity-50 cursor-not-allowed"
                        }`}
                        title="Copy"
                      >
                        <BiCopy />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={generateDepositLink}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg shadow"
                  >
                    Generate deposit link
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — Transactions */}
          <div className="bg-[#1f2937] rounded-xl p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">Transactions</h3>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-400">
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Value</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {txs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12">
                        <div className="h-24 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                          No rows
                        </div>
                      </td>
                    </tr>
                  ) : (
                    txs.map((tx, i) => (
                      <tr key={i} className="border-t border-gray-700">
                        <td className="py-3">{tx.date}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1">
                            {tx.status === "Completed" ? (
                              <AiOutlineCheckCircle className="text-green-500" />
                            ) : (
                              <AiOutlineCloseCircle className="text-red-500" />
                            )}
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3">{tx.value}</td>
                        <td className="py-3 truncate max-w-[320px]">
                          {tx.description}
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-gray-400 hover:text-white">
                            <BiCopy />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {txs.length === 0 ? (
                <div className="h-24 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                  No rows
                </div>
              ) : (
                txs.map((tx, i) => (
                  <div
                    key={i}
                    className="bg-[#111827] rounded-lg p-3 space-y-1"
                  >
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{tx.date}</span>
                      <span className="flex items-center gap-1">
                        {tx.status === "Completed" ? (
                          <AiOutlineCheckCircle className="text-green-500" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500" />
                        )}
                        {tx.status}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Value</span>
                        <span>{tx.value}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2 mt-1">
                        <span className="text-gray-400">Desc</span>
                        <span className="flex-1 truncate">
                          {tx.description}
                        </span>
                        <button className="text-gray-400 hover:text-white">
                          <BiCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                Rows per page:
                <button className="bg-[#111827] border border-gray-700 px-2 py-1 rounded">
                  10
                </button>
              </div>
              <div className="flex items-center gap-4">
                1–10 of 178
                <div className="flex items-center gap-2">
                  <span className="opacity-60">‹</span>
                  <span className="opacity-60">›</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
