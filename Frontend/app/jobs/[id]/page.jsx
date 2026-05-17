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

  //
  // FETCH JOB
  //
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

  //
  // UPDATE STATUS
  //
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

  //
  // DELETE JOB
  //
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

  //
  // STATUS COLORS
  //
  const statusColors = {
    Open: "bg-green-500",
    "In Progress": "bg-yellow-500",
    Closed: "bg-red-500",
  };

  //
  // LOADING
  //
  if (loading) {
    return <Loader />;
  }

  //
  // NO JOB
  //
  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Job not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {job.title}
            </h1>

            <p className="text-slate-400">
              {job.location}
            </p>
          </div>

          <span
            className={`h-fit px-4 py-2 rounded-full text-white font-medium ${statusColors[job.status]}`}
          >
            {job.status}
          </span>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Description
          </h2>

          <p className="text-slate-300 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-slate-900 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400 mb-1">
              Category
            </h3>

            <p className="font-semibold">
              {job.category}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400 mb-1">
              Contact Name
            </h3>

            <p className="font-semibold">
              {job.contactName || "N/A"}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400 mb-1">
              Contact Email
            </h3>

            <p className="font-semibold">
              {job.contactEmail}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400 mb-1">
              Created At
            </h3>

            <p className="font-semibold">
              {new Date(job.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* STATUS UPDATE */}
        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Update Status
          </label>

          <select
            value={job.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="bg-slate-900 border border-slate-700 rounded-lg p-3 w-full"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4">
          
          <button
            onClick={() => router.push("/")}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition"
          >
            Back to Home
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg transition"
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
}