"use client";

import Link from "next/link";

export default function JobCard({ job }) {
  const statusColors = {
    Open: "bg-green-500",
    "In Progress": "bg-yellow-500",
    Closed: "bg-red-500",
  };

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-slate-800 rounded-xl p-5 shadow-lg hover:scale-[1.02] transition border border-slate-700">
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">
            {job.title}
          </h2>

          <span
            className={`text-sm px-3 py-1 rounded-full text-white ${statusColors[job.status]}`}
          >
            {job.status}
          </span>
        </div>

        <p className="text-slate-300 mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex justify-between text-sm text-slate-400">
          <span>{job.category}</span>

          <span>{job.location}</span>
        </div>
      </div>
    </Link>
  );
}