import { useState } from "react";

export default function TradesTable() {
  const [tradeType, setTradeType] = useState<"Buy" | "Sell">("Buy");

  return (
    <div className="bg-[#1f2937] rounded-xl shadow border border-gray-200 p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Trades</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            tradeType === "Buy"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {tradeType}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-gray-400 text-xs border-b">
            <tr>
              <th className="py-2 pr-4 text-left">Amount</th>
              <th className="py-2 pr-4 text-left">Coin</th>
              <th className="py-2 pr-4 text-left">Payment</th>
              <th className="py-2 pr-4 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state (for now) */}
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-400">
                No trades found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toggle Buttons (optional for demo/testing) */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setTradeType("Buy")}
          className={`text-xs px-3 py-1 rounded ${
            tradeType === "Buy"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTradeType("Sell")}
          className={`text-xs px-3 py-1 rounded ${
            tradeType === "Sell"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Sell
        </button>
      </div>
    </div>
  );
}
