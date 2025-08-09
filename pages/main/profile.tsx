// pages/main/profile.tsx
import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import {
  FiMapPin,
  FiLock,
  FiUsers,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="text-white space-y-6">
        {/* Breadcrumbs + title */}
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="text-sm text-gray-400">
            Main <span className="mx-1">›</span>{" "}
            <span className="text-white">Profile</span>
          </div>
        </div>

        {/* Cover / identity block */}
        <div className="relative bg-[#143b2f] rounded-xl overflow-hidden">
          {/* Cover image tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 pointer-events-none" />
          <Image
            src="/assets/register-illustration.png" // just a texture; replace with a cover if you like
            alt="cover"
            fill
            className="object-cover opacity-35"
            priority
          />
          {/* avatar + name */}
          <div className="relative px-5 pt-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src="/assets/avatar.png"
                  alt="avatar"
                  width={72}
                  height={72}
                  className="rounded-full ring-4 ring-black/40"
                />
                <span className="absolute -right-1 -bottom-1 w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-[#0f172a]" />
              </div>
              <div>
                <div className="text-lg font-semibold">demo</div>
                <div className="text-gray-300 text-sm">Dee Deeee</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 text-white border border-white/10">
                <FiLock className="opacity-80" />
                Display
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-300 hover:text-white">
                <FiUsers className="opacity-80" />
                Followers
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-300 hover:text-white">
                <FiHeart className="opacity-80" />
                Following
              </button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: stats + about */}
          <div className="space-y-4">
            {/* Followers / following numbers */}
            <div className="bg-[#1f2937] rounded-xl px-6 py-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">26</div>
                <div className="text-sm text-gray-400">Following</div>
              </div>
            </div>

            {/* About card */}
            <div className="bg-[#1f2937] rounded-xl p-5 space-y-3">
              <div className="text-sm text-gray-300">No Biography.</div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <AiOutlineClockCircle />
                Last seen 2 minutes ago
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <BsCalendar3 />
                Registered Nov 10, 2021
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <FiMapPin />
                Lives in Nigeria
              </div>
            </div>
          </div>

          {/* Right column: offers */}
          <div className="lg:col-span-2 space-y-6">
            {/* Buy Offers */}
            <div className="bg-[#1f2937] rounded-xl p-4">
              <h3 className="font-medium mb-2">Buy Offers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-400">
                    <tr>
                      <th className="py-2">Coin</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Limit</th>
                      <th className="py-2">Payment</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="py-10">
                        <div className="h-20 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                          No rows
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* footer controls */}
              <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  Rows per page:
                  <button className="bg-[#111827] border border-gray-700 px-2 py-1 rounded">
                    10
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  0–0 of 0
                  <div className="flex items-center gap-2">
                    <button className="opacity-60">
                      <FiChevronLeft />
                    </button>
                    <button className="opacity-60">
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sell Offers */}
            <div className="bg-[#1f2937] rounded-xl p-4">
              <h3 className="font-medium mb-2">Sell Offers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-400">
                    <tr>
                      <th className="py-2">Coin</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Limit</th>
                      <th className="py-2">Payment</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="py-10">
                        <div className="h-20 rounded-lg bg-[#111827] flex items-center justify-center text-gray-400">
                          No rows
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* footer controls */}
              <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  Rows per page:
                  <button className="bg-[#111827] border border-gray-700 px-2 py-1 rounded">
                    10
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  0–0 of 0
                  <div className="flex items-center gap-2">
                    <button className="opacity-60">
                      <FiChevronLeft />
                    </button>
                    <button className="opacity-60">
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
