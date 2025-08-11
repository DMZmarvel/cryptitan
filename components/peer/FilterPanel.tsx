// components/peer/FilterPanel.tsx
import { useState } from "react";

export default function FilterPanel() {
  const [wallet, setWallet] = useState("");
  const [methodTab, setMethodTab] = useState<"bank" | "other">("bank");
  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className="bg-[#1f2937] rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-3 text-white/90">
        Filter Offers
      </h3>

      <select
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90"
      >
        <option value="">Wallet</option>
        <option>BTC</option>
        <option>ETH</option>
        <option>USDT</option>
      </select>

      <div className="mt-3 grid grid-cols-2 bg-[#111827] border border-white/10 rounded-lg overflow-hidden text-sm">
        <button
          onClick={() => setMethodTab("bank")}
          className={`py-2 ${
            methodTab === "bank" ? "bg-white/10 text-white" : "text-gray-300"
          }`}
        >
          Bank Account
        </button>
        <button
          onClick={() => setMethodTab("other")}
          className={`py-2 ${
            methodTab === "other" ? "bg-white/10 text-white" : "text-gray-300"
          }`}
        >
          Other Methods
        </button>
      </div>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mt-3 w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90"
      >
        <option value="">Currency</option>
        <option>USD</option>
        <option>EUR</option>
        <option>NGN</option>
      </select>

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="mt-3 w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90"
      >
        <option value="">Country</option>
        <option>United States</option>
        <option>Nigeria</option>
        <option>United Kingdom</option>
      </select>

      <div className="mt-3 flex gap-3">
        <button
          className="flex-1 h-10 rounded-lg bg-[#111827] border border-white/10 text-sm"
          onClick={() => {
            setWallet("");
            setCurrency("");
            setCountry("");
            setMethodTab("bank");
          }}
        >
          Clear
        </button>
        <button className="flex-1 h-10 rounded-lg bg-white/10 text-white text-sm">
          Apply
        </button>
      </div>
    </div>
  );
}
