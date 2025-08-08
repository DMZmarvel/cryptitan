// components/Topbar.tsx
import { FiBell } from "react-icons/fi";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="w-full h-16 px-4 flex items-center justify-end border-b border-white/10 backdrop-blur-md bg-white/10 shadow-sm">
      {/* Language + Notification + User */}
      <div className="flex items-center space-x-6">
        {/* Language */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <Image
            src="/assets/flags.png"
            alt="EN"
            width={40}
            height={30}
            className="rounded"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FiBell className="text-white text-lg" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
            9+
          </span>
        </div>

        {/* User Avatar */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src="/assets/avatar.png"
            alt="User"
            width={32}
            height={32}
            className="rounded-full border border-white/20"
          />
        </div>
      </div>
    </div>
  );
}
