// components/Sidebar.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
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
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { BiCubeAlt } from "react-icons/bi";
import SupportWidget from "./SupportWidget";

export default function Sidebar() {
  const router = useRouter();

  const [openDropdowns, setOpenDropdowns] = useState({
    commerce: false,
    peer: false,
    exchange: false,
    stake: false,
  });

  // Automatically open dropdown on active route
  useEffect(() => {
    const path = router.pathname;
    if (path.startsWith("/main/commerce"))
      setOpenDropdowns((prev) => ({ ...prev, commerce: true }));
    if (path.startsWith("/main/peer"))
      setOpenDropdowns((prev) => ({ ...prev, peer: true }));
    if (path.startsWith("/main/exchange"))
      setOpenDropdowns((prev) => ({ ...prev, exchange: true }));
    if (path.startsWith("/main/stake"))
      setOpenDropdowns((prev) => ({ ...prev, stake: true }));
  }, [router.pathname]);

  // Dropdown toggle
  const toggleDropdown = (key: keyof typeof openDropdowns) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Link item
  const MenuItem = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`block px-4 py-1.5 text-sm rounded-md transition duration-200 ${
        router.pathname === href
          ? "text-white bg-green-600 font-semibold"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      • {label}
    </Link>
  );

  return (
    <aside className="w-64 h-screen bg-[#111827] text-white flex flex-col justify-between shadow-lg lg:shadow-none">
      {/* Top Section */}
      <div className="p-4 space-y-2 overflow-y-auto hide-scrollbar">
        {/* Logo + Welcome Block */}
        <div className="flex flex-col items-center space-y-2 mb-6">
          <Image
            src="/assets/avatar.png"
            alt="avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="text-sm font-medium">Welcome, demo</div>
          <button className="bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
            <span className="text-white text-xs">⚙</span> Control Panel
          </button>
        </div>

        {/* GENERAL */}
        <div className="space-y-1">
          <p className="text-xs text-gray-400 font-semibold mb-1 px-2">
            GENERAL
          </p>
          <Link
            href="/main"
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
              router.pathname === "/main"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <FiHome /> Home
          </Link>
          <Link
            href="/main/profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
              router.pathname === "/main/profile"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <FiUser /> Profile
          </Link>
          <Link
            href="/main/Payments"
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
              router.pathname === "/main/Payments"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <FiCreditCard /> Payments
          </Link>
          <Link
            href="/main/Wallets"
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
              router.pathname === "/main/Wallets"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <MdAccountBalanceWallet /> Wallets
          </Link>
        </div>

        {/* COMMERCE */}
        <div>
          <div
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("commerce")}
          >
            <span className="flex items-center gap-2">
              <BiCubeAlt /> Commerce
            </span>
            {openDropdowns.commerce ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {openDropdowns.commerce && (
            <div className="pl-6 space-y-1 transition-all duration-300 ease-in-out animate-fade-slide origin-top">
              <MenuItem href="/main/commerce/dashboard" label="Dashboard" />
              <MenuItem
                href="/main/commerce/transactions"
                label="Transactions"
              />
              <MenuItem href="/main/commerce/payments" label="Payments" />
              <MenuItem href="/main/commerce/customers" label="Customers" />
              <MenuItem href="/main/commerce/account" label="Account" />
            </div>
          )}
        </div>

        {/* MARKETPLACE */}
        <div>
          <p className="text-xs text-gray-400 font-semibold mt-6 mb-1 px-2">
            MARKETPLACE
          </p>

          {/* Peer */}
          <div
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("peer")}
          >
            <span className="flex items-center gap-2">
              <FiUsers /> Peer
            </span>
            {openDropdowns.peer ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {openDropdowns.peer && (
            <div className="pl-6 space-y-1 transition-all duration-300 ease-in-out animate-fade-slide origin-top">
              <MenuItem href="/main/peer/buy" label="Buy Crypto" />
              <MenuItem href="/main/peer/sell" label="Sell Crypto" />
              <MenuItem href="/main/peer/offer" label="Create Offer" />
              <MenuItem href="/main/peer/trades" label="Trades" />
            </div>
          )}

          {/* Exchange */}
          <div
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("exchange")}
          >
            <span className="flex items-center gap-2">
              <FiDollarSign /> Exchange
            </span>
            {openDropdowns.exchange ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {openDropdowns.exchange && (
            <div className="pl-6 space-y-1 transition-all duration-300 ease-in-out animate-fade-slide origin-top">
              <MenuItem href="/main/exchange/trade" label="Trade" />
              <MenuItem href="/main/exchange/swap" label="Swap" />
            </div>
          )}

          {/* Stake */}
          <div
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("stake")}
          >
            <span className="flex items-center gap-2">
              <BsFillRocketTakeoffFill /> Stake
            </span>
            {openDropdowns.stake ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {openDropdowns.stake && (
            <div className="pl-6 space-y-1 transition-all duration-300 ease-in-out animate-fade-slide origin-top">
              <MenuItem href="/main/stake/plans" label="Plans" />
              <MenuItem href="/main/stake/manage" label="Manage" />
            </div>
          )}
        </div>
      </div>

      {/* SUPPORT */}
      <div className="p-4">
        <SupportWidget />
      </div>
    </aside>
  );
}
