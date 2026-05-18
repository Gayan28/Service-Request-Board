"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { createJob } from "@/services/jobService";

import { getToken } from "@/lib/auth";

export default function NewJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  //
  // PROTECT PAGE
  //
  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  }, []);

  //
  // HANDLE CHANGE
  //
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //
  // SUBMIT FORM
  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = getToken();

      await createJob(form, token);

      toast.success("Job created successfully");

      router.push("/");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
      
      <h1 className="text-3xl font-bold mb-6">
        Create New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        
        {/* TITLE */}
        <div>
          <label className="block mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-2">
            Description
          </label>

          <textarea
            name="description"
            required
            rows="5"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-2">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
          >
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

        {/* LOCATION */}
        <div>
          <label className="block mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            required
            value={form.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
          />
        </div>

        {/* CONTACT NAME */}
        <div>
          <label className="block mb-2">
            Contact Name
          </label>

          <input
            type="text"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
          />
        </div>

        {/* CONTACT EMAIL */}
        <div>
          <label className="block mb-2">
            Contact Email
          </label>

          <input
            type="email"
            name="contactEmail"
            required
            value={form.contactEmail}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}