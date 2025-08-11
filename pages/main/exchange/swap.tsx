import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
// NOTE: same import location as above
import TableShell from "@/components/peer/TableShell";
import { LuArrowUpDown } from "react-icons/lu";

type SwapTx = { date: string; from: string; to: string; status: string };

const STORAGE_KEY = "xt_mock_swap";

export default function ExchangeSwapPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [useMock, setUseMock] = useState(false);
  const [rows, setRows] = useState<SwapTx[]>([]);

  useEffect(() => {
    setUseMock(
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1"
    );
  }, []);

  useEffect(() => {
    if (!useMock) return setRows([]);
    setRows([
      { date: "Aug 08, 2025", from: "BTC", to: "ETH", status: "Completed" },
      { date: "Aug 05, 2025", from: "USDT", to: "BTC", status: "Pending" },
    ]);
  }, [useMock]);

  const head = useMemo<string[]>(() => ["Date", "From", "To", "Status"], []);

  return (
    <DashboardLayout>
      <div className="w-full px-4 py-6 space-y-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Swap</h1>
            <p className="text-sm text-gray-400">
              Main <span className="mx-1">›</span>{" "}
              <span className="text-white">Swap</span>
            </p>
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-300">
            <input
              type="checkbox"
              checked={useMock}
              onChange={(e) => {
                const v = e.target.checked;
                setUseMock(v);
                if (typeof window !== "undefined")
                  localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
              }}
            />
            Mock data
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: form */}
          <div className="bg-[#1f2937] rounded-xl p-6">
            <label className="block text-xs text-gray-400 mb-1">From *</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select asset</option>
              <option>BTC</option>
              <option>ETH</option>
              <option>USDT</option>
            </select>

            <div className="flex items-center justify-center my-6">
              <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center">
                <LuArrowUpDown className="text-gray-300" />
              </div>
            </div>

            <label className="block text-xs text-gray-400 mb-1">To *</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select asset</option>
              <option>BTC</option>
              <option>ETH</option>
              <option>USDT</option>
            </select>

            <button
              disabled
              className="w-full mt-6 bg-red-500/80 hover:bg-red-500 disabled:opacity-60 disabled:hover:bg-red-500/80 text-white font-semibold rounded-lg py-2"
            >
              Proceed
            </button>
          </div>

          {/* Right: table */}
          <div className="bg-[#1f2937] rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">Transactions</h3>

            {rows.length === 0 ? (
              <TableShell head={head} rowsLabel="No rows" />
            ) : (
              <TableShell head={head}>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-2 px-4">{r.date}</td>
                    <td className="py-2 px-4">{r.from}</td>
                    <td className="py-2 px-4">{r.to}</td>
                    <td className="py-2 px-4">{r.status}</td>
                  </tr>
                ))}
              </TableShell>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
