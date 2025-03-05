"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.post("/api/users/login", user, {
        withCredentials: true,
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!user.email || !user.password);
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-10 py-10 text-5xl">
        {loading ? "Logging in..." : "Account Login"}
      </h1>

      {error && (
        <div className="mb-4 w-[350px] rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <input
        className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
          setError("");
        }}
        placeholder="Your Email..."
      />

      <input
        className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
          setError("");
        }}
        placeholder="Your Password..."
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="mt-10 rounded-lg border border-gray-300 p-2 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none disabled:opacity-50"
      >
        {loading ? "Processing..." : "Login"}
      </button>

      {/* Rest of the component remains same */}
    </div>
  );
}
