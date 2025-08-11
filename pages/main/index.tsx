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
        {/* First Row: Transactions, Payments, Wallet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <RecentTransactions />
          <PaymentDonut />
          <WalletEmptyCard />
        </div>

        {/* Second Row: Trades and Account Limits */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TradesTable />
          </div>
          <AccountLimits />
        </div>
      </div>
    </DashboardLayout>
  );
}
