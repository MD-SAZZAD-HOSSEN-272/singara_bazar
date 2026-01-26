"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../Components/firebase";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)


        if (!email || !password) {
            Swal.fire("Error", "Please fill in all fields", "error");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                route.push('/')
                setLoading(false)
                // ...
            })
            .catch((error) => {
                console.log('wrong', error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please register first",
                    footer: '<a href="register">Register Now</a>'
                });
                const errorCode = error.code;
                const errorMessage = error.message;
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

                        <div className="relative">

                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
                                placeholder="Your password"
                            />
                                                    
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className={`w-full py-3 mt-3 rounded-2xl bg-gradient-to-r cursor-pointer from-[#f050b3] to-[#a05bfc] text-white font-bold shadow-lg hover:scale-105 transition transform ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                        {
                            loading ? 'Loading....' : 'Login'
                        }
                    </button>
                </form>

                <Link href='register' className="mt-6 text-white/70 text-center text-sm">
                    Don't have an account? <span className="underline cursor-pointer">Sign up</span>
                </Link>
            </div>
        </div>
    );
}
