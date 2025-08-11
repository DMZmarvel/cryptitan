import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TableShell from "@/components/peer/TableShell";
import FilterPanel from "@/components/peer/FilterPanel";
import FakeDataToolbar from "@/components/peer/FakeDataToolbar";
import {
  OfferRow,
  sampleBuyOffers,
  readRows,
  saveRows,
  clearRows,
} from "@/lib/peerSamples";

const LS_KEY = "peer_buy_rows";

export default function PeerBuyPage() {
  const [rows, setRows] = useState<OfferRow[]>([]);
  useEffect(() => setRows(readRows<OfferRow>(LS_KEY)), []);

  const loadSamples = () => {
    saveRows(LS_KEY, sampleBuyOffers);
    setRows(sampleBuyOffers);
  };
  const wipe = () => {
    clearRows(LS_KEY);
    setRows([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-white">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Buy Crypto</h1>
            <div className="text-sm text-gray-400">
              Main <span className="mx-1">›</span> <span className="text-white">Buy Crypto</span>
            </div>
          </div>
          <FakeDataToolbar onLoad={loadSamples} onClear={wipe} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TableShell head={["Seller","Coin","Price","Limit","Payment","Action"]}>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="px-4 py-3">{r.party}</td>
                  <td className="px-4 py-3">{r.coin}</td>
                  <td className="px-4 py-3">{r.price}</td>
                  <td className="px-4 py-3">{r.limit}</td>
                  <td className="px-4 py-3">{r.payment}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs bg-green-600/90 hover:bg-green-600 px-3 py-1 rounded">
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </TableShell>
          </div>
          <FilterPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
