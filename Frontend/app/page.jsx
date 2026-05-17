"use client";

import { useEffect, useState } from "react";
import { getJobs } from "@/services/jobService";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  //
  // FETCH JOBS
  //
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs({
        category,
        status,
        search,
      });

      setJobs(data.jobs);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  //
  // LOAD ON FILTER CHANGE
  //
  useEffect(() => {
    fetchJobs();
  }, [category, status]);

  //
  // DEBOUNCED SEARCH EFFECT
  //
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  //
  // SEARCH HANDLER
  //
  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Service Requests
        </h1>
        <p className="text-slate-400">
          Browse and manage all job requests
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* CATEGORY */}
        <select
          className="bg-slate-800 p-2 rounded-md border border-slate-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Painting">Painting</option>
          <option value="Joinery">Joinery</option>
        </select>

        {/* STATUS */}
        <select
          className="bg-slate-800 p-2 rounded-md border border-slate-700"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search jobs..."
          className="bg-slate-800 p-2 rounded-md border border-slate-700 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-cyan-500 px-4 py-2 rounded-md hover:bg-cyan-600"
        >
          Search
        </button>
      </div>

      {/* CONTENT WRAPPER WITH MIN HEIGHT */}
      <div className="min-h-[300px]">
        {loading ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <EmptyState message="No jobs found" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}