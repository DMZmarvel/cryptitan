import DashboardLayout from "@/components/DashboardLayout";
import { FiCalendar } from "react-icons/fi";

function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="bg-[#1f2937] rounded-xl p-4 shadow-md">
      <p className="text-sm text-gray-300">{title}</p>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <p className="text-xs text-gray-400 mt-1">— {hint}</p>
    </div>
  );
}

export default function CommerceDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Heading + Period */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Statistics</h1>
            <div className="text-sm text-gray-400">
              Main <span className="mx-1">›</span>{" "}
              <span className="text-white">…</span>
              <span className="mx-1">›</span>{" "}
              <span className="text-white">Dashboard</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 bg-[#1f2937] text-gray-200 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5">
            <FiCalendar />
            Select Period
          </button>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Transactions" value={0} hint="from last period" />
          <StatCard
            title="Total Amount"
            value={"$0.00"}
            hint="from last period"
          />
          <StatCard title="New Customers" value={0} hint="from last period" />
          <div className="bg-[#1f2937] rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-300">Total Received</p>
            <div className="mt-10 h-28 rounded-xl bg-[#111827] grid place-items-center">
              <div className="text-center">
                <p className="font-semibold text-white">
                  Oops! Nothing is here.
                </p>
                <p className="text-xs text-gray-400">
                  Please, check back later.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Overview */}
        <div className="bg-[#1f2937] rounded-xl p-4 shadow-md">
          <p className="text-sm text-gray-300 mb-2">Transactions</p>
          <p className="text-xs text-gray-500 mb-4">Overview</p>
          <div className="h-64 rounded-xl bg-[#111827] grid place-items-center">
            <div className="text-center">
              <p className="font-semibold text-white">Oops! Nothing is here.</p>
              <p className="text-xs text-gray-400">Please, check back later.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
