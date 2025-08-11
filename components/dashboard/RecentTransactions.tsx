import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function RecentTransactions() {
  return (
    <div className="bg-[#1f2937] text-white rounded-xl p-4 shadow-md w-full overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Recent Transactions</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2 px-4">Coin</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Value</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                No rows
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-400 px-2">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-[#111827] text-white border border-gray-700 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>0–0 of 0</span>
          <button className="p-1 hover:text-white">
            <FiArrowLeft size={16} />
          </button>
          <button className="p-1 hover:text-white">
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
