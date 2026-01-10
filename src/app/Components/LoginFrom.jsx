"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    // Call your login function here
    if (onLogin) onLogin({ email, password });

    Swal.fire("Success", "Logged in successfully!", "success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f050b3] to-[#a05bfc]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">🔐 Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-3 cursor-pointer rounded-2xl bg-gradient-to-r from-[#f050b3] to-[#a05bfc] text-white font-bold shadow-lg hover:scale-105 transition transform"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-white/70 text-center text-sm">
          Don't have an account? <span className="underline cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}
