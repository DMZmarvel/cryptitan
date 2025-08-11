import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

type OfferSide = "BUY" | "SELL";
type PriceMode = "Fixed" | "Percent";

export default function CreateOfferPage() {
  const [side, setSide] = useState<OfferSide>("BUY");
  const [priceMode, setPriceMode] = useState<PriceMode>("Fixed");

  return (
    <DashboardLayout>
      <div className="space-y-6 text-white">
        <div>
          <h1 className="text-2xl font-semibold">Create Offer</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">Create Offer</span>
          </div>
        </div>

        {/* Steps line (visual) */}
        <div className="flex items-center gap-10 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Price
          </div>
          <div className="h-[2px] w-28 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" /> Payment
          </div>
          <div className="h-[2px] w-28 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" /> Terms
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left editor */}
          <div className="lg:col-span-2 bg-[#1f2937] rounded-xl p-4">
            {/* BUY/SELL toggle */}
            <div className="grid grid-cols-2 bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setSide("BUY")}
                className={`py-3 ${
                  side === "BUY" ? "bg-white/10 text-white" : "text-gray-300"
                }`}
              >
                BUY
              </button>
              <button
                onClick={() => setSide("SELL")}
                className={`py-3 ${
                  side === "SELL" ? "bg-white/10 text-white" : "text-gray-300"
                }`}
              >
                SELL
              </button>
            </div>

            {/* Account + Currency */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm">
                <option>Account *</option>
                <option>BTC</option>
                <option>USDT</option>
              </select>
              <select className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm">
                <option>US Dollar (USD)</option>
                <option>Nigerian Naira (NGN)</option>
              </select>
            </div>

            {/* Price settings */}
            <div className="mt-5">
              <p className="text-xs text-gray-400 mb-2">PRICE SETTINGS</p>

              <div className="grid grid-cols-2 bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setPriceMode("Fixed")}
                  className={`py-2 ${
                    priceMode === "Fixed"
                      ? "bg-white/10 text-white"
                      : "text-gray-300"
                  }`}
                >
                  Fixed
                </button>
                <button
                  onClick={() => setPriceMode("Percent")}
                  className={`py-2 ${
                    priceMode === "Percent"
                      ? "bg-white/10 text-white"
                      : "text-gray-300"
                  }`}
                >
                  Percent
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input
                  placeholder={`${priceMode} Price *`}
                  className="flex-1 bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm"
                />
                <div className="text-xs text-gray-300">USD</div>
              </div>
            </div>
          </div>

          {/* Right summary */}
          <div className="bg-[#1f2937] rounded-xl p-4">
            <div className="divide-y divide-white/10 text-sm">
              <div className="py-3 flex items-center justify-between">
                <span className="text-gray-400">Offer Type</span>
                <span className="font-medium">
                  {side === "BUY" ? "Buy" : "Sell"}
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-gray-400">Price Type</span>
                <span className="font-medium">{priceMode}</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-gray-400">Country</span>
                <span className="font-medium">—</span>
              </div>
            </div>

            <button className="mt-4 w-full h-11 rounded-lg bg-red-500/90 hover:bg-red-500 text-white font-semibold">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
