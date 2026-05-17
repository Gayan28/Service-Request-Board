"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      setToken(data.token);

      toast.success("Login successful");

      router.push("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

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

        <button className="w-full bg-green-500 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}