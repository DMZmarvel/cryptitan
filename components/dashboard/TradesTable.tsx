// components/dashboard/TradesTable.tsx
import React from "react";

type TradesTableProps = {
  /** Which side to display the badge for */
  side?: "buy" | "sell";
  /** Optional title override */
  title?: string;
};

export default function TradesTable({
  side = "buy",
  title = "Trades",
}: TradesTableProps) {
  const isBuy = side === "buy";
  const counterpartyHeader = isBuy ? "Seller" : "Buyer";

  return (
    <div className="bg-[#1f2937] rounded-xl p-4 shadow-md text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">{title}</h3>
        <span
          className={[
            "px-2 py-0.5 text-xs rounded-md font-medium",
            isBuy ? "bg-green-700/60 text-green-100" : "bg-red-700/60 text-red-100",
          ].join(" ")}
        >
          {isBuy ? "Buy" : "Sell"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm">
          <thead className="text-gray-300/70">
            <tr className="text-left">
              <th className="py-2 pr-4 font-medium">Amount</th>
              <th className="py-2 pr-4 font-medium">Coin</th>
              <th className="py-2 pr-4 font-medium">Payment</th>
              <th className="py-2 pr-4 font-medium">{counterpartyHeader}</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state */}
            <tr>
              <td
                colSpan={4}
                className="py-10 text-center text-gray-400 border-t border-white/5"
              >
                No rows
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Faux scrollbar strip (like Cryptitan) */}
      <div className="mt-3 h-2 rounded bg-white/10">
        <div className="h-full w-1/2 rounded bg-white/20" />
      </div>

      {/* Footer pager */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-300/80">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <button className="inline-flex items-center gap-1 rounded-md bg-[#0f172a] px-2 py-1">
            10 <span className="opacity-70">▾</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span>0–0 of 0</span>
          <button
            aria-label="Prev page"
            className="rounded-md bg-white/10 w-6 h-6 grid place-items-center hover:bg-white/15"
          >
            ‹
          </button>
          <button
            aria-label="Next page"
            className="rounded-md bg-white/10 w-6 h-6 grid place-items-center hover:bg-white/15"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
