"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../Components/firebase";
import { useRouter } from "next/navigation";

export default function SignInForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email || !password) {
            Swal.fire("Error", "Please fill in all fields", "error");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                route.push('/')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f050b3] to-[#a05bfc]">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">🔐 Login</h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-white font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm"
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
                            className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
                            placeholder="Your password"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-3 rounded-2xl bg-gradient-to-r from-[#f050b3] to-[#a05bfc] text-white font-bold shadow-lg hover:scale-105 transition transform"
                    >
                        Login
                    </button>
                </form>

                <Link href='register' className="mt-6 text-white/70 text-center text-sm">
                    Don't have an account? <span className="underline cursor-pointer">Sign up</span>
                </Link>
            </div>
        </div>
    );
}
