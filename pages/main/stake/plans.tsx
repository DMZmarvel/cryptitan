import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TableShell from "@/components/peer/TableShell";

type Plan = {
  id: string;
  coin: string;
  title: string;
  period: string;
  apr: number;
  min: string;
  max: string;
};

const STORAGE_KEY = "xt_mock_stake_plans";

export default function StakePlansPage() {
  const [useMock, setUseMock] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    setUseMock(
      typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1"
    );
  }, []);
  useEffect(() => {
    if (!useMock) return setPlans([]);
    setPlans([
      {
        id: "p1",
        coin: "USDT",
        title: "USDT Flexible",
        period: "30 days",
        apr: 6.5,
        min: "$50",
        max: "$5,000",
      },
      {
        id: "p2",
        coin: "BTC",
        title: "BTC Fixed",
        period: "60 days",
        apr: 3.2,
        min: "0.001",
        max: "0.25",
      },
      {
        id: "p3",
        coin: "ETH",
        title: "ETH Fixed",
        period: "90 days",
        apr: 4.8,
        min: "0.02",
        max: "5",
      },
    ]);
  }, [useMock]);

  return (
    <DashboardLayout>
      <div className="w-full px-4 py-6 space-y-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Plans</h1>
            <p className="text-sm text-gray-400">
              Main <span className="mx-1">›</span>{" "}
              <span className="text-white">Plans</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.length === 0 ? (
            <div className="col-span-full">
              <TableShell
                head={["Plan", "Coin", "Period", "Est. APR", "Min", "Max"]}
                rowsLabel="No plans"
              />
            </div>
          ) : (
            plans.map((p) => (
              <div
                key={p.id}
                className="bg-[#1f2937] rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-300">{p.title}</div>
                    <div className="text-2xl font-bold">{p.coin}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Est. APR</div>
                    <div className="text-xl font-semibold">{p.apr}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-[#111827] border border-white/10 rounded-lg p-3">
                    <div className="text-gray-400 text-xs">Period</div>
                    <div className="font-medium">{p.period}</div>
                  </div>
                  <div className="bg-[#111827] border border-white/10 rounded-lg p-3">
                    <div className="text-gray-400 text-xs">Min</div>
                    <div className="font-medium">{p.min}</div>
                  </div>
                  <div className="bg-[#111827] border border-white/10 rounded-lg p-3">
                    <div className="text-gray-400 text-xs">Max</div>
                    <div className="font-medium">{p.max}</div>
                  </div>
                  <div className="bg-[#111827] border border-white/10 rounded-lg p-3">
                    <div className="text-gray-400 text-xs">Subscribe</div>
                    <div className="font-medium">Disabled</div>
                  </div>
                </div>

                <button
                  disabled
                  className="mt-1 w-full bg-emerald-600/70 text-white font-semibold py-2 rounded-lg disabled:opacity-60 cursor-not-allowed"
                >
                  Subscribe
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
