import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
// NOTE: make sure this matches where your TableShell actually lives
import TableShell from "@/components/peer/TableShell";
import { LuArrowUpDown } from "react-icons/lu";

type Tx = {
  date: string;
  status: string;
  payment: string;
  wallet: string;
  trader: string;
};

const STORAGE_KEY = "xt_mock_trade";

export default function ExchangeTradePage() {
  const [tab, setTab] = useState<"Buy" | "Sell">("Buy");
  const [price, setPrice] = useState("");
  const [value, setValue] = useState("");
  const [account, setAccount] = useState("");
  const [useMock, setUseMock] = useState(false);
  const [rows, setRows] = useState<Tx[]>([]);

  useEffect(() => {
    setUseMock(
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1"
    );
  }, []);

  useEffect(() => {
    if (!useMock) return setRows([]);
    setRows([
      {
        date: "Aug 10, 2025",
        status: "Completed",
        payment: "Card",
        wallet: "BTC",
        trader: "satoshi",
      },
      {
        date: "Aug 09, 2025",
        status: "Pending",
        payment: "Bank",
        wallet: "ETH",
        trader: "vitalik",
      },
    ]);
  }, [useMock]);

  const tableHead = useMemo<string[]>(
    () => ["Date", "Status", "Payment", "Wallet", "Trader"],
    []
  );

  return (
    <DashboardLayout>
      <div className="w-full px-4 py-6 space-y-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Trade</h1>
            <p className="text-sm text-gray-400">
              Main <span className="mx-1">›</span>{" "}
              <span className="text-white">Trade</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
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
            <select
              className="bg-[#111827] border border-white/10 rounded-md px-3 py-2 text-sm"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            >
              <option value="">Select account</option>
              <option>Primary USD</option>
              <option>BTC Spot</option>
              <option>ETH Spot</option>
            </select>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form card */}
          <div className="bg-[#1f2937] rounded-xl overflow-hidden">
            <div className="flex">
              {(["Buy", "Sell"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 px-4 py-3 text-sm border-b-2 ${
                    tab === t
                      ? "border-red-400 bg-white/5"
                      : "border-transparent hover:bg-white/5 text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <label className="block text-xs text-gray-400">Price *</label>
              <div className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2">
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center">
                  <LuArrowUpDown className="text-gray-300" />
                </div>
              </div>

              <label className="block text-xs text-gray-400">Value *</label>
              <div className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              <select
                className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option value="">select account…</option>
                <option>Primary USD</option>
                <option>BTC Spot</option>
                <option>ETH Spot</option>
              </select>

              <button
                disabled
                className="w-full mt-2 bg-gray-600/40 text-gray-300 font-semibold rounded-lg py-2 cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>

          {/* Transactions table */}
          <div className="bg-[#1f2937] rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">Transactions</h3>

            {rows.length === 0 ? (
              <TableShell head={tableHead} rowsLabel="No rows" />
            ) : (
              <TableShell head={tableHead}>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="py-2 px-4">{r.date}</td>
                    <td className="py-2 px-4">{r.status}</td>
                    <td className="py-2 px-4">{r.payment}</td>
                    <td className="py-2 px-4">{r.wallet}</td>
                    <td className="py-2 px-4">{r.trader}</td>
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
