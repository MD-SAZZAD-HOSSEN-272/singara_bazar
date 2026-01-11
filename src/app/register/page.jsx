"use client";

import { useState } from "react";
import Swal from "sweetalert2";


import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Components/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";





export default function LoginForm({ onLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            Swal.fire("Error", "Please fill in all fields", "error");
            return;
        }

        const userData = { name, email, password };


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;


                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    route.push('/')
                    console.log(user)
                }).catch((error) => {
                    // An error occurred
                    // ...
                });




                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f050b3] to-[#a05bfc]">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">🔐 Register Now</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-white font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm"
                            placeholder="Type your name"
                        />
                    </div>

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
                        Sign up
                    </button>
                </form>

                <Link href='login' className="mt-8 text-white/70 text-center text-sm">
                    Already have an account? <span className="underline cursor-pointer">Login</span>
                </Link>
            </div>
        </div>
    );
}
