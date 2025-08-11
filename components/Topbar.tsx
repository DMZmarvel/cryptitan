import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiBell } from "react-icons/fi";
import {
  getUser,
  clearUser,
  initialFromNameOrEmail,
  StoredUser,
} from "@/lib/auth";

export default function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const read = () => setUser(getUser());
    read();

    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onUpdate = () => read();

    document.addEventListener("mousedown", onDoc);
    window.addEventListener("storage", onUpdate);
    window.addEventListener("ct:user-updated", onUpdate as EventListener);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("ct:user-updated", onUpdate as EventListener);
    };
  }, []);

  const name = user?.username || "demo";
  const email = user?.email || "";
  const initial = initialFromNameOrEmail(user?.username, user?.email);

  const logout = () => {
    clearUser();
    router.push("/auth/login");
  };

  return (
    <div className="w-full h-16 px-4 flex items-center justify-end border-b border-white/10 backdrop-blur-md bg-white/10 relative overflow-visible">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1 cursor-pointer">
          <Image
            src="/assets/flags.png"
            alt="EN"
            width={40}
            height={30}
            className="rounded"
          />
        </div>

        <div className="relative cursor-pointer">
          <FiBell className="text-white/90 text-lg" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 text-white text-[10px] leading-4 text-center">
            9+
          </span>
        </div>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 rounded-full grid place-items-center bg-green-600 text-white font-semibold border border-white/20"
            aria-label="Open profile menu"
          >
            {initial}
          </button>

          {open && (
            <div
              className="
                absolute right-0 top-full mt-2 w-56 rounded-lg
                bg-[#161b23] text-white shadow-2xl border border-white/10
                overflow-hidden z-[1000]
              "
            >
              <div className="px-4 py-3 border-b border-white/10">
                <div className="text-sm font-semibold truncate">{name}</div>
                {email && (
                  <div className="text-xs text-gray-300 truncate">{email}</div>
                )}
              </div>

              <div className="py-1 text-sm">
                <Link
                  href="/main"
                  className="block px-4 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/main/profile"
                  className="block px-4 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/main/account"
                  className="block px-4 py-2 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  Account
                </Link>
              </div>

              <div className="px-4 py-3 border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full rounded-md border border-white/20 py-1.5 font-semibold hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
