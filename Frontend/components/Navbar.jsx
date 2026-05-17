"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  const [token, setTokenState] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const updateToken = () => {
      setTokenState(getToken());
    };

    updateToken();

    window.addEventListener("storage", updateToken);

    const interval = setInterval(updateToken, 500);

    return () => {
      window.removeEventListener("storage", updateToken);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setTokenState(null);
    router.push("/login");
  };

  return (
    <nav className="border-b border-slate-700 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BriefcaseBusiness />
          GlobalTNA
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-cyan-400">
            Home
          </Link>

          <Link href="/new-job" className="hover:text-cyan-400">
            New Job
          </Link>

          {!token ? (
            <>
              <Link href="/login" className="hover:text-cyan-400">
                Login
              </Link>

              <Link href="/register" className="hover:text-cyan-400">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}