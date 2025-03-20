"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", role: "" });
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

      console.log("Login Response:", response.data);
      alert(`User Role: ${response.data.role}`);

      const receivedRole = response.data.role?.toLowerCase()?.trim();
      console.log("Processed Role:", receivedRole);

      if (!receivedRole) {
        throw new Error("No role received from server");
      }

      router.push(
        receivedRole === "superadmin" ? "/admin/dashboard" : "/admin/dashboard",
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", error);

      toast.error(`Login Failed: ${errorMessage}`);
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

      <div className="mb-4 w-[350px] text-center">
        <p className="mb-2 text-gray-700">Demo credentials for quick login</p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={() =>
              setUser({
                email: "sysfoc-superAdmin@gmail.com",
                password: "1234",
                role: "superadmin",
              })
            }
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            SuperAdmin Login
          </button>

          <button
            onClick={() =>
              setUser({
                email: "sysfoc-user@gmail.com",
                password: "1234",
                role: "user",
              })
            }
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
          >
            Staff Login
          </button>
        </div>
      </div>

      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="mt-10 rounded-lg border border-gray-300 p-2 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none disabled:opacity-50"
      >
        {loading ? "Processing..." : "Login"}
      </button>
    </div>
  );
}
