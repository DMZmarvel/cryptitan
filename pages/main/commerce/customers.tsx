import DashboardLayout from "@/components/DashboardLayout";
import { FiPlus, FiSearch, FiTrash2, FiEye, FiEdit } from "react-icons/fi";

export default function CommerceCustomers() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Customers</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">…</span>
            <span className="mx-1">›</span>{" "}
            <span className="text-white">Customers</span>
          </div>
        </div>

        <div className="bg-[#1f2937] rounded-xl shadow-md p-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="relative w-72 max-w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search customers..."
                className="w-full pl-9 pr-3 h-9 bg-[#111827] border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <button className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm px-3 py-2 rounded-lg shadow">
              <FiPlus /> Add
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left">First Name</th>
                  <th className="py-3 text-left">Last Name</th>
                  <th className="py-3 text-left">Email</th>
                  <th className="py-3 text-left">Created</th>
                  <th className="py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 text-gray-300">—</td>
                    <td className="py-3 text-gray-300">—</td>
                    <td className="py-3 text-gray-300">—</td>
                    <td className="py-3 text-gray-300">—</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <button className="hover:text-white">
                          <FiTrash2 />
                        </button>
                        <button className="hover:text-white">
                          <FiEye />
                        </button>
                        <button className="hover:text-white">
                          <FiEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
