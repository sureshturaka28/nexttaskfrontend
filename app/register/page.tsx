"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      await api.post("/auth/register", { email, password });

      toast.success("Account created 🎉");

      router.push("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <motion.div
      className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleRegister}
        className="p-8 w-[360px] bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">
          📝 Register
        </h1>

       
        <input
          className="border border-gray-600 p-2 w-full bg-transparent text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

       
        <input
          className="border border-gray-600 p-2 w-full bg-transparent text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

      
        <input
          className="border border-gray-600 p-2 w-full bg-transparent text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        
        <button
          type="submit"
          className="bg-green-500 w-full p-2 rounded-lg hover:bg-green-600 transition font-semibold"
        >
          Sign Up
        </button>

      
        <p className="text-sm text-center text-gray-300">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </motion.div>
  );
}