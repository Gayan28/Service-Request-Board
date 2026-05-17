"use client";

import Link from "next/link";

import { BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-700 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <BriefcaseBusiness />

          <span>GlobalTNA</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <Link
            href="/new-job"
            className="hover:text-cyan-400 transition"
          >
            New Job
          </Link>

          <Link
            href="/login"
            className="hover:text-cyan-400 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}