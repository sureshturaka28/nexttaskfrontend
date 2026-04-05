"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.replace("/dashboard");
    }
  }, []);

  if (!mounted) return null;

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

 
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      toast.success("Login successful 🚀");

      router.replace("/dashboard");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <motion.div
      className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleLogin}
        className="p-8 w-[350px] bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">
          🔐 Login
        </h1>

        <input
          className="border p-2 w-full bg-transparent text-white rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full bg-transparent text-white rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </motion.div>
  );
}