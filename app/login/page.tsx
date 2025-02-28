"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  console.log(user);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-10 py-10 text-5xl">
        {loading ? "We're logging you in..." : "Account Login"}
      </h1>

      <input
        className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Your Email..."
      />

      <input
        className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Your Password..."
      />

      <button
        onClick={onLogin}
        className="mt-10 rounded-lg border border-gray-300 p-2 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
      >
        Login
      </button>

      <Link href="/sign-up">
        <p className="mt-10">
          Do not have an account yet?
          <span className="ml-2 cursor-pointer font-bold text-green-600 underline">
            Register your free account now
          </span>
        </p>
      </Link>

      <Link href="/">
        <p className="mt-8 opacity-50">
          <FaAngleLeft className="mr-1 inline" /> Back to the Homepage
        </p>
      </Link>
    </div>
  );
}
