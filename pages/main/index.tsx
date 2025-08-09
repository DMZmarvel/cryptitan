// pages/main/index.tsx
import DashboardLayout from "@/components/DashboardLayout";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import PaymentDonut from "@/components/dashboard/PaymentDonut";
import WalletEmptyCard from "@/components/dashboard/EmptyWallet";
import TradesTable from "@/components/dashboard/TradesTable";
import AccountLimits from "@/components/dashboard/AccountLimits";

export default function MainDashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full px-4 py-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-400">
          <span className="text-gray-300">Main</span>
          <span className="mx-2">›</span>
          <span className="text-white">Home</span>
        </div>

        {/* Row 1: Recent Transactions • Payment • Wallet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <RecentTransactions />
          <PaymentDonut />
          <WalletEmptyCard />
        </div>

        {/* Row 2: Trades (Buy) • Account Limits */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            {/* If your TradesTable supports a prop, pass side="buy" for the green badge */}
            <TradesTable side="buy" />
          </div>
          <AccountLimits />
        </div>

        {/* Row 3: Trades (Sell) full width */}
        <div className="grid grid-cols-1">
          <TradesTable side="sell" />
        </div>
      </div>
    </DashboardLayout>
  );
}
