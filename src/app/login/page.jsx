"use client";

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../Components/firebase";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchUserDataFromMongodb } from "../register/page";
import { users } from "../api/auth/route";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const provider = new GoogleAuthProvider();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire("Error", "Please fill in all fields", "error");
            return;
        }

        try {
            setLoading(true); // 🔥 start loading immediately

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successful!",
                showConfirmButton: false,
                timer: 1500,
            });

            route.push("/");
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Invalid email or password. Don’t have an account yet? Create one now.",
                footer: '<a href="/register">Create Account</a>',
            });
        } finally {
            setLoading(false); // 🔥 stop loading always
        }
    };


    const handleGoogleLogIn = async () => {
        try {
            setLoading(true);

            const result = await signInWithPopup(auth, provider);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            console.log(user, credential);

            if (!user?.email) return;

            const fieldData = {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
                password: user?.providerId,
                date: new Date()
            }

            // Get users from MongoDB
            const userData = await fetchUserDataFromMongodb();

            const existingUser = userData.find(
                singleUser => singleUser.email === user.email
            );

            // If user does not exist, create new user
            if (!existingUser) {
                const res = await users(fieldData);
                console.log(res);
            }

            route.push("/");

            // Success alert
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: existingUser ? "Login Successful!" : "Registration successful!",
                showConfirmButton: false,
                timer: 1500,
            });



        } catch (error) {
            console.error(error.message);

            if (error.code === "auth/popup-closed-by-user") {
                console.log("Login cancelled by user");
                return; // exit quietly
            }
            
            console.log(
                GoogleAuthProvider.credentialFromError(error)
            );
            setLoading(false)
        } finally {
            setLoading(false);
        }
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
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-3 mt-3 rounded-2xl bg-gradient-to-r cursor-pointer from-[#f050b3] to-[#a05bfc] text-white font-bold shadow-lg hover:scale-105 transition transform ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        >
                            {
                                loading ? 'Loading....' : 'Login'
                            }
                        </button>
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-3 text-sm text-gray-500">OR</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        {/* Google Login Button (NEW DESIGN) */}
                        <button
                            type="button"
                            onClick={handleGoogleLogIn}
                            disabled={loading}
                            className={`w-full py-3 rounded-2xl flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-50 hover:scale-105 transition transform ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                }`}
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                    </div>
                </form>

                <div className="mt-5 text-center">
                    <Link href="/register" className="text-white/70 text-sm">
                        Don't have an account? <span className="underline cursor-pointer">Sign up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
