import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiUser,
  FiCreditCard,
  FiUsers,
  FiDollarSign,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiCubeAlt } from "react-icons/bi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import SupportWidget from "./SupportWidget";
import { getUser, initialFromNameOrEmail, StoredUser } from "@/lib/auth";

type DropKeys = "commerce" | "peer" | "exchange" | "stake";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState<Record<DropKeys, boolean>>({
    commerce: false,
    peer: false,
    exchange: false,
    stake: false,
  });

  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const read = () => setUser(getUser());
    read();
    const onUpdate = () => read();
    window.addEventListener("storage", onUpdate);
    window.addEventListener("ct:user-updated", onUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("ct:user-updated", onUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    const p = router.pathname;
    setOpen((prev) => ({
      ...prev,
      commerce: p.startsWith("/main/commerce") || prev.commerce,
      peer: p.startsWith("/main/peer") || prev.peer,
      exchange: p.startsWith("/main/exchange") || prev.exchange,
      stake: p.startsWith("/main/stake") || prev.stake,
    }));
  }, [router.pathname]);

  const toggle = (k: DropKeys) => setOpen((s) => ({ ...s, [k]: !s[k] }));
  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + "/");

  const ItemRow = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
      ${
        isActive(href)
          ? "bg-[#0f3c2c] text-white"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      <Icon className="text-[18px] opacity-90" />
      <span>{label}</span>
    </Link>
  );

  const GroupRow = ({
    label,
    icon: Icon,
    open,
    onClick,
  }: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    open: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800"
    >
      <span className="flex items-center gap-3">
        <Icon className="text-[18px] opacity-90" />
        {label}
      </span>
      {open ? (
        <FiChevronUp className="opacity-80" />
      ) : (
        <FiChevronDown className="opacity-80" />
      )}
    </button>
  );

  const BulletLink = ({
    href,
    children,
  }: {
    href: string;
    children: string;
  }) => (
    <Link
      href={href}
      className={`block ml-6 px-4 py-1.5 text-sm rounded-md transition
      ${
        isActive(href)
          ? "bg-[#0f3c2c] text-white"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      • {children}
    </Link>
  );

  const displayName = user?.username || "demo";
  const displayEmail = user?.email || "";
  const initial = initialFromNameOrEmail(user?.username, user?.email);

  return (
    <aside className="w-64 h-screen bg-[#111827] text-white flex flex-col justify-between shadow-lg">
      <div className="p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
        <div className="flex items-center justify-between px-1">
          <div className="w-7 h-7 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-300 text-xs">
            ○
          </div>
        </div>

        <div className="mt-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-semibold grid place-items-center">
              {initial}
            </div>
            <div className="text-sm">
              <div className="text-gray-200 truncate">
                {user ? `Welcome, ${displayName}` : "Welcome, demo"}
              </div>
              {displayEmail && (
                <div className="text-[11px] text-gray-400 truncate">
                  {displayEmail}
                </div>
              )}
              <div className="mt-2">
                <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  <span className="w-2 h-2 rounded-full bg-emerald-200" />
                  Control Panel
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="px-2 text-[11px] tracking-wide text-gray-400 font-semibold">
            GENERAL
          </p>

          <div className="space-y-2">
            <ItemRow href="/main" icon={FiHome} label="Home" />
            <ItemRow href="/main/profile" icon={FiUser} label="Profile" />
            <ItemRow
              href="/main/payments"
              icon={FiCreditCard}
              label="Payments"
            />
            <ItemRow
              href="/main/wallets"
              icon={MdAccountBalanceWallet}
              label="Wallets"
            />
          </div>

          <div className="pt-2 space-y-2">
            <GroupRow
              label="Commerce"
              icon={BiCubeAlt}
              open={open.commerce}
              onClick={() => toggle("commerce")}
            />
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                open.commerce
                  ? "max-h-64 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-1"
              }`}
            >
              <div className="space-y-2 pl-0">
                <BulletLink href="/main/commerce/dashboard">
                  Dashboard
                </BulletLink>
                <BulletLink href="/main/commerce/transactions">
                  Transactions
                </BulletLink>
                <BulletLink href="/main/commerce/payments">Payments</BulletLink>
                <BulletLink href="/main/commerce/customers">
                  Customers
                </BulletLink>
                <BulletLink href="/main/commerce/accounts">Account</BulletLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <p className="px-2 text-[11px] tracking-wide text-gray-400 font-semibold">
            MARKETPLACE
          </p>

          <div className="space-y-2">
            <GroupRow
              label="Peer"
              icon={FiUsers}
              open={open.peer}
              onClick={() => toggle("peer")}
            />
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                open.peer
                  ? "max-h-64 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-1"
              }`}
            >
              <div className="space-y-2">
                <BulletLink href="/main/peer/buy">Buy Crypto</BulletLink>
                <BulletLink href="/main/peer/sell">Sell Crypto</BulletLink>
                <BulletLink href="/main/peer/offer">Create Offer</BulletLink>
                <BulletLink href="/main/peer/trades">Trades</BulletLink>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <GroupRow
              label="Exchange"
              icon={FiDollarSign}
              open={open.exchange}
              onClick={() => toggle("exchange")}
            />
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                open.exchange
                  ? "max-h-40 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-1"
              }`}
            >
              <div className="space-y-2">
                <BulletLink href="/main/exchange/trade">Trade</BulletLink>
                <BulletLink href="/main/exchange/swap">Swap</BulletLink>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <GroupRow
              label="Stake"
              icon={BsFillRocketTakeoffFill}
              open={open.stake}
              onClick={() => toggle("stake")}
            />
            <div
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
                open.stake
                  ? "max-h-32 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-1"
              }`}
            >
              <div className="space-y-2">
                <BulletLink href="/main/stake/plans">Plans</BulletLink>
                <BulletLink href="/main/stake/manage">Manage</BulletLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <SupportWidget />
      </div>
    </aside>
  );
}
