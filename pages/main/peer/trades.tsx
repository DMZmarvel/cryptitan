import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TableShell from "@/components/peer/TableShell";
import FakeDataToolbar from "@/components/peer/FakeDataToolbar";
import {
  TradeRow,
  sampleTradesBuySide,
  sampleTradesSellSide,
  readRows,
  saveRows,
  clearRows,
} from "@/lib/peerSamples";

type Tab = "All" | "Active" | "Completed" | "Canceled" | "Disputed";

export default function PeerTradesPage() {
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [tab, setTab] = useState<Tab>("All");
  const [rows, setRows] = useState<TradeRow[]>([]);
  const key = side === "Buy" ? "peer_trades_buy" : "peer_trades_sell";

  useEffect(() => setRows(readRows<TradeRow>(key)), [side]);

  const load = () => {
    const data = side === "Buy" ? sampleTradesBuySide : sampleTradesSellSide;
    saveRows(key, data);
    setRows(data);
  };
  const wipe = () => {
    clearRows(key);
    setRows([]);
  };

  const head =
    side === "Buy"
      ? ["Amount", "Coin", "Price", "Payment", "Seller", "Status", "Action"]
      : ["Amount", "Coin", "Price", "Payment", "Buyer", "Status", "Action"];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-white">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Trades</h1>
            <div className="text-sm text-gray-400">
              Main <span className="mx-1">›</span>{" "}
              <span className="text-white">Trades</span>
            </div>

            {/* Buy / Sell switch */}
            <div className="mt-4 flex items-center gap-6 text-sm">
              {(["Buy", "Sell"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`relative py-2 ${
                    side === s ? "text-white" : "text-gray-400"
                  }`}
                >
                  {s}
                  {side === s && (
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-red-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <FakeDataToolbar onLoad={load} onClear={wipe} />
        </div>

        {/* Tabs (visual only) */}
        <div className="bg-[#1f2937] rounded-xl">
          <div className="px-4 pt-3">
            <div className="flex flex-wrap gap-3 text-sm">
              {(
                ["All", "Active", "Completed", "Canceled", "Disputed"] as Tab[]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-2 rounded-lg ${
                    tab === t ? "bg-white/10 text-white" : "text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <TableShell head={head}>
              {rows.map((r, i) => (
                <tr key={i} className="border-top border-white/10">
                  <td className="px-4 py-3">{r.amount}</td>
                  <td className="px-4 py-3">{r.coin}</td>
                  <td className="px-4 py-3">{r.price}</td>
                  <td className="px-4 py-3">{r.payment}</td>
                  <td className="px-4 py-3">{r.counterparty}</td>
                  <td className="px-4 py-3">{r.status}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs bg-white/10 px-3 py-1 rounded">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </TableShell>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
