"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "/components/Loader";
import {
  getJobById,
  updateJobStatus,
  deleteJob,
} from "/services/jobService";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // FETCH JOB
  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await getJobById(jobId);
      setJob(data.job);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  // UPDATE STATUS
  const handleStatusChange = async (e) => {
    try {
      setUpdating(true);
      const newStatus = e.target.value;
      const data = await updateJobStatus(jobId, newStatus);
      setJob(data.job);
      toast.success("Status updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  // DELETE JOB
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await deleteJob(jobId, token);
      toast.success("Job deleted successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete job");
    }
  };

  // STATUS COLORS
  const statusColors = {
    Open: "bg-green-500/15 text-green-400 border border-green-500/25",
    "In Progress": "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25",
    Closed: "bg-red-500/15 text-red-400 border border-red-500/25",
  };

  // LOADING
  if (loading) {
    return <Loader />;
  }

  // NO JOB
  if (!job) {
    return (
      <div className="text-center py-40">
        <h2 className="text-2xl font-bold text-slate-400">
          Job not found
        </h2>
      </div>
    );
  }

  return (
    /* Added a substantial top and bottom padding container wrapper ('py-12') to separate the layout card from screen bounds */
    <div className="max-w-3xl mx-auto px-4 py-12">
      
      {/* Changed internal spacing layout to 'space-y-12' for dramatic vertical section gaps inside the card */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700 shadow-2xl flex flex-col space-y-12">
        
        {/* TOP SECTION HEADER */}
        {/* Increased the padding-bottom 'pb-8' below the horizontal ruler divider line */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-700/60 pb-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 leading-tight">
              {job.title}
            </h1>
            <p className="text-slate-400 text-base font-medium">
              📍 {job.location}
            </p>
          </div>

          <span
            className={`h-fit px-4 py-2 rounded-md text-xs font-semibold tracking-wider uppercase shrink-0 ${statusColors[job.status]}`}
          >
            {job.status}
          </span>
        </div>

        {/* DESCRIPTION SECTION */}
        {/* Increased vertical stack gap 'space-y-4' between heading and main descriptive text block */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-200">
            Description
          </h2>
          <p className="text-slate-300 leading-relaxed text-base">
            {job.description}
          </p>
        </div>

        {/* DETAILS GRID */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-200">
            Metadata Details
          </h2>
          {/* Increased rows/columns card box gap breakdown layout to 'gap-6' */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-700/40 p-5 rounded-xl space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </h3>
              <p className="font-semibold text-slate-200 text-sm">
                {job.category}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-700/40 p-5 rounded-xl space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact Name
              </h3>
              <p className="font-semibold text-slate-200 text-sm">
                {job.contactName || "N/A"}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-700/40 p-5 rounded-xl space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact Email
              </h3>
              <p className="font-semibold text-slate-200 text-sm break-all">
                {job.contactEmail}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-700/40 p-5 rounded-xl space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Created At
              </h3>
              <p className="font-semibold text-slate-200 text-sm">
                {new Date(job.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* STATUS UPDATE SELECTOR BLOCK */}
        {/* Added internal block space-y-4 to keep label split smoothly from form select option bar */}
        <div className="space-y-4 bg-slate-900/30 p-6 rounded-xl border border-slate-700/40">
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-400">
            Update Project Status
          </label>
          <select
            value={job.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3.5 w-full text-sm font-medium outline-none focus:border-cyan-500 transition-colors cursor-pointer text-slate-200"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* ACTIONS FOOTER BUTTON ROW */}
        {/* Added an explicit 'pt-4' to decouple action execution inputs from structural elements above */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => router.push("/")}
            className="bg-slate-700 hover:bg-slate-600 active:scale-[0.98] px-6 py-4 rounded-lg text-sm font-bold tracking-wide uppercase transition-all text-slate-100 cursor-pointer text-center flex-1"
          >
            Back to Home
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 active:scale-[0.98] px-6 py-4 rounded-lg text-sm font-bold tracking-wide uppercase transition-all text-white shadow-md shadow-red-500/10 cursor-pointer text-center flex-1"
          >
            Delete Job
          </button>
        </div>

      </div>
    </div>
  );
}