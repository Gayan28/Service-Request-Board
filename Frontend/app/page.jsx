"use client";

import { useEffect, useState } from "react";
import { getJobs } from "/services/jobService";
import JobCard from "/components/JobCard";
import Loader from "/components/Loader";
import EmptyState from "/components/EmptyState";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  <div className="mb-8">
  <h1 className="text-4xl font-bold mb-2">
    Service Request Board
  </h1>

  <p className="text-slate-400">
    Browse and manage homeowner service requests
  </p>
</div>

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
    /* 1. Changed 'space-y-6' to 'space-y-12' to add significantly larger gaps between main vertical sections.
      2. Added 'px-6 py-10 max-w-7xl mx-auto' to push the entire layout away from the viewport edges and keep it clean.
    */
    <div className="space-y-12 px-6 py-10 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Service Requests
        </h1>
        <p className="text-slate-400">
          Browse and manage all job requests
        </p>
      </div>

      {/* FILTERS */}
      {/* Increased the flex gap items from 'gap-4' to 'gap-6' for better horizontal spacing */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* CATEGORY */}
        <select
          className="bg-slate-800 p-2.5 rounded-md border border-slate-700 text-sm"
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
          className="bg-slate-800 p-2.5 rounded-md border border-slate-700 text-sm"
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
          className="bg-slate-800 p-2.5 rounded-md border border-slate-700 flex-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-cyan-500 px-5 py-2.5 rounded-md hover:bg-cyan-600 font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* CONTENT WRAPPER WITH MIN HEIGHT */}
      <div className="min-h-[400px]">
        {loading ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <EmptyState message="No jobs found" />
        ) : (
          /* Increased the grid gaps from 'gap-4' to 'gap-6' so cards don't sit directly against each other */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}