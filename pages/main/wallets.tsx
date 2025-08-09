// pages/main/wallets.tsx
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";

type Tx = {
  date: string;
  status: "Completed" | "Canceled";
  coin: string;
  value: string;
  desc: string;
};
const transactions: Tx[] = []; // static “No rows”

export default function WalletsPage() {
  const [tab, setTab] = useState<"send" | "receive">("send");
  const [account, setAccount] = useState("");

  return (
    <DashboardLayout>
      <div className="text-white space-y-6">
        {/* Title + crumb + top-right selector */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Wallets</h1>
            <div className="text-sm text-gray-400">
              Main <span className="mx-1">›</span>{" "}
              <span className="text-white">Wallets</span>
            </div>
          </div>

          <button
            type="button"
            className="hidden md:flex items-center gap-2 bg-[#111827] border border-gray-700 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#0f1623]"
          >
            Select account <FiChevronDown />
          </button>
        </div>

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Assets */}
          <div className="bg-[#1f2937] rounded-xl shadow p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <h3 className="font-semibold">Your Assets</h3>
              <button
                type="button"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-green-600 text-white shadow
                           hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                aria-label="Add asset"
              >
                <FiPlus />
              </button>
            </div>

            {/* Total */}
            <div className="px-5 pb-4">
              <div className="text-center py-2">
                <div className="text-3xl font-bold">0</div>
                <div className="text-gray-400 text-sm mt-1">Total Balance</div>
              </div>
            </div>

            <div className="border-t border-gray-700" />

            {/* Table header row */}
            <div className="grid grid-cols-4 text-xs md:text-sm text-gray-400 px-5 py-3">
              <div>Coin</div>
              <div>Available</div>
              <div>Balance</div>
              <div>Quota</div>
            </div>

            {/* Empty state */}
            <div className="px-5 pb-5">
              <div className="h-24 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                No rows
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-[#1f2937] rounded-xl shadow p-0 overflow-hidden">
            <div className="px-5 py-4">
              <h3 className="font-semibold">Transactions</h3>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-400">
                  <tr className="grid grid-cols-5 px-5 py-2">
                    <th className="font-medium">Date</th>
                    <th className="font-medium">Status</th>
                    <th className="font-medium">Coin</th>
                    <th className="font-medium">Value</th>
                    <th className="font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12">
                        <div className="h-24 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                          No rows
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx, i) => (
                      <tr
                        key={i}
                        className="grid grid-cols-5 px-5 py-2 border-t border-gray-700"
                      >
                        <td>{tx.date}</td>
                        <td className="flex items-center gap-2">
                          {tx.status === "Completed" ? (
                            <AiOutlineCheckCircle className="text-green-500" />
                          ) : (
                            <AiOutlineCloseCircle className="text-red-500" />
                          )}
                          {tx.status}
                        </td>
                        <td>{tx.coin}</td>
                        <td>{tx.value}</td>
                        <td className="flex items-center justify-between gap-2">
                          <span className="truncate">{tx.desc}</span>
                          <button className="text-gray-400 hover:text-white">
                            <BiCopy />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden px-5 pb-4 space-y-3">
              {transactions.length === 0 ? (
                <div className="h-24 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                  No rows
                </div>
              ) : (
                transactions.map((tx, i) => (
                  <div
                    key={i}
                    className="bg-[#111827] rounded-lg p-3 space-y-1"
                  >
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{tx.date}</span>
                      <span className="flex items-center gap-1">
                        {tx.status === "Completed" ? (
                          <AiOutlineCheckCircle className="text-green-500" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500" />
                        )}
                        {tx.status}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Coin</span>
                        <span>{tx.coin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Value</span>
                        <span>{tx.value}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2 mt-1">
                        <span className="text-gray-400">Desc</span>
                        <span className="flex-1 truncate">{tx.desc}</span>
                        <button className="text-gray-400 hover:text-white">
                          <BiCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination footer mimic */}
            <div className="border-t border-gray-700 px-5 py-3 text-xs text-gray-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                Rows per page:
                <button className="bg-[#111827] border border-gray-700 px-2 py-1 rounded">
                  10
                </button>
              </div>
              <div className="flex items-center gap-4">
                0–0 of 0
                <div className="flex items-center gap-2">
                  <span className="opacity-60">‹</span>
                  <span className="opacity-60">›</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Send / Receive */}
        <div className="bg-[#1f2937] rounded-xl shadow p-0 overflow-hidden max-w-3xl">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setTab("send")}
              className={`flex-1 px-5 py-3 text-sm font-medium border-b-2 ${
                tab === "send"
                  ? "border-green-500 text-white"
                  : "border-transparent text-gray-400"
              }`}
            >
              Send
            </button>
            <button
              onClick={() => setTab("receive")}
              className={`flex-1 px-5 py-3 text-sm font-medium border-b-2 ${
                tab === "receive"
                  ? "border-green-500 text-white"
                  : "border-transparent text-gray-400"
              }`}
            >
              Receive
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Select account *
              </label>
              <div className="relative">
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-3 text-sm appearance-none"
                >
                  <option value="">—</option>
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                  <option value="usdt">USDT</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              disabled={!account}
              className={`w-full px-4 py-3 rounded-lg font-semibold ${
                account
                  ? "bg-green-600 hover:bg-green-500 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {tab === "send" ? "Continue" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
