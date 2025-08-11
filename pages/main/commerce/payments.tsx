import DashboardLayout from "@/components/DashboardLayout";
import { FiSearch, FiPlus } from "react-icons/fi";

export default function CommercePayments() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Payments</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">…</span>
            <span className="mx-1">›</span>{" "}
            <span className="text-white">Payments</span>
          </div>
        </div>

        <div className="bg-[#1f2937] rounded-xl shadow-md p-4">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="relative w-64 max-w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search payments..."
                className="w-full pl-9 pr-3 h-9 bg-[#111827] border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <button className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm px-3 py-2 rounded-lg shadow">
              <FiPlus /> New
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left">Title</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Type</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Link</th>
                  <th className="py-3 text-left">Created</th>
                  <th className="py-3 text-left">Action</th>
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

          {/* Footer */}
          <div className="flex items-center justify-end gap-6 text-xs text-gray-400 mt-3">
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
    </DashboardLayout>
  );
}
