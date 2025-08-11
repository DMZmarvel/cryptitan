// pages/main/stake/manage.tsx
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TableShell from "@/components/peer/TableShell";

type Row = {
  coin: string;
  amount: string;
  yield: string;
  period: string;
  apr: string;
  subscription: string;
  redemption: string;
  status: "Holding" | "Redeemed" | "Pending";
};

const STORAGE_KEY = "xt_mock_stake_manage";

export default function StakeManagePage() {
  const [tab, setTab] = useState<"All" | "Holding" | "Redeemed" | "Pending">(
    "All"
  );
  const [useMock, setUseMock] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setUseMock(
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1"
    );
  }, []);

  useEffect(() => {
    if (!useMock) return setRows([]);
    setRows([
      {
        coin: "USDT",
        amount: "1,250",
        yield: "8.1",
        period: "30d",
        apr: "6.5%",
        subscription: "Aug 01, 2025",
        redemption: "-",
        status: "Holding",
      },
      {
        coin: "BTC",
        amount: "0.015",
        yield: "0.0003",
        period: "60d",
        apr: "3.2%",
        subscription: "Jul 15, 2025",
        redemption: "—",
        status: "Pending",
      },
      {
        coin: "ETH",
        amount: "0.7",
        yield: "0.010",
        period: "90d",
        apr: "4.8%",
        subscription: "May 10, 2025",
        redemption: "Aug 10, 2025",
        status: "Redeemed",
      },
    ]);
  }, [useMock]);

  const head = useMemo<string[]>(
    () => [
      "Coin",
      "Amount",
      "Yield",
      "Period",
      "Est. APR",
      "Subscription",
      "Redemption",
      "Status",
    ],
    []
  );

  const filtered = useMemo(
    () => (tab === "All" ? rows : rows.filter((r) => r.status === tab)),
    [rows, tab]
  );

  const counts = useMemo(
    () => ({
      All: rows.length,
      Holding: rows.filter((r) => r.status === "Holding").length,
      Redeemed: rows.filter((r) => r.status === "Redeemed").length,
      Pending: rows.filter((r) => r.status === "Pending").length,
    }),
    [rows]
  );

  // Build mobile cards from table data (labels must match `head`)
  const mobileRows = filtered.map((r) => ({
    Coin: r.coin,
    Amount: r.amount,
    Yield: r.yield,
    Period: r.period,
    "Est. APR": r.apr,
    Subscription: r.subscription,
    Redemption: r.redemption,
    Status: r.status,
  }));

  return (
    <DashboardLayout>
      <div className="w-full px-4 py-6 space-y-6 text-white">
        <div>
          <h1 className="text-2xl font-semibold">Manage</h1>
          <p className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">Manage</span>
          </p>
        </div>

        {/* Tabs + mock switch */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(["All", "Holding", "Redeemed", "Pending"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md text-sm border ${
                  tab === t
                    ? "bg-white/10 border-white/20"
                    : "bg-[#1f2937] border-white/10 text-gray-300 hover:bg-white/5"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                      t === "All"
                        ? "bg-gray-500/40"
                        : t === "Holding"
                        ? "bg-yellow-500/40"
                        : t === "Redeemed"
                        ? "bg-green-500/40"
                        : "bg-blue-500/40"
                    }`}
                  >
                    {counts[t]}
                  </span>
                  {t}
                </span>
              </button>
            ))}
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

        {/* Table (desktop) + Cards (mobile) */}
        {filtered.length === 0 ? (
          <TableShell head={head} rowsLabel="No rows" mobileRows={[]} />
        ) : (
          <TableShell head={head} mobileRows={mobileRows}>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="py-2 px-4">{r.coin}</td>
                <td className="py-2 px-4">{r.amount}</td>
                <td className="py-2 px-4">{r.yield}</td>
                <td className="py-2 px-4">{r.period}</td>
                <td className="py-2 px-4">{r.apr}</td>
                <td className="py-2 px-4">{r.subscription}</td>
                <td className="py-2 px-4">{r.redemption}</td>
                <td className="py-2 px-4">{r.status}</td>
              </tr>
            ))}
          </TableShell>
        )}
      </div>
    </DashboardLayout>
  );
}
