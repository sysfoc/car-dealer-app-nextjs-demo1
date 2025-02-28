"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("signup okay", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to sign up the user", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  console.log(user);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-10 py-10 text-5xl">Account Signup</h1>
      <input
        className="mb-4 w-[350px] rounded-lg border border-gray-300 p-2 text-slate-800 focus:border-gray-600 focus:outline-none"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Your Username..."
      />

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
        onClick={onSignUp}
        className="mt-10 rounded-lg border border-gray-300 p-2 px-40 py-3 font-bold uppercase focus:border-gray-600 focus:outline-none"
      >
        {buttonDisabled ? "Sign Up" : "Register My Account Now"}
      </button>

      <Link href="/login">
        <p className="mt-10">
          Do you have a free account already?{" "}
          <span className="ml-2 cursor-pointer font-bold text-green-600 underline">
            Login to your account
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
