"use client";

import { useState } from "react";
import { registerUser } from "@/services/authService";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(form);

      setToken(data.token);

      toast.success("Registered successfully");

      router.push("/");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 bg-slate-900 border border-slate-700 rounded"
        />

        <button className="w-full bg-cyan-500 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}