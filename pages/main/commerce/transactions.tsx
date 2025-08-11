import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

type Tab = "All" | "Pending" | "Completed" | "Canceled";

export default function CommerceTransactions() {
  const [tab, setTab] = useState<Tab>("All");

  const tabs: { key: Tab; count: number; color: string }[] = [
    { key: "All", count: 148, color: "bg-gray-500" },
    { key: "Pending", count: 0, color: "bg-blue-500" },
    { key: "Completed", count: 0, color: "bg-green-500" },
    { key: "Canceled", count: 148, color: "bg-red-500" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Transactions</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">…</span>
            <span className="mx-1">›</span>{" "}
            <span className="text-white">Transactions</span>
          </div>
        </div>

        <div className="bg-[#1f2937] rounded-xl shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-4 px-4 pt-4">
            {tabs.map(({ key, count, color }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative pb-3 text-sm flex items-center gap-2 text-gray-200 hover:text-white`}
              >
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] ${color} text-white`}
                >
                  {count}
                </span>
                {key}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition ${
                    tab === key ? "bg-red-500" : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="px-4 pb-4">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm">
                <thead className="text-gray-400">
                  <tr className="border-b border-white/10">
                    <th className="py-3 text-left">Coin</th>
                    <th className="py-3 text-left">Customer</th>
                    <th className="py-3 text-left">Amount</th>
                    <th className="py-3 text-left">Received</th>
                    <th className="py-3 text-left">Address</th>
                    <th className="py-3 text-left">Status</th>
                    <th className="py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="py-14">
                      <div className="h-20 bg-[#111827] rounded-lg grid place-items-center text-gray-400">
                        No rows
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-end gap-6 text-xs text-gray-400 mt-3 border-t border-white/10 pt-3">
              <div className="flex items-center gap-2">
                Rows per page:
                <button className="px-2 py-1 rounded bg-[#111827] border border-white/10">
                  10 ▾
                </button>
              </div>
              <div>0–0 of 0</div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-[#111827] border border-white/10">
                  ‹
                </button>
                <button className="px-2 py-1 rounded bg-[#111827] border border-white/10">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
