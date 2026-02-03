"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../Components/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { users } from "../api/auth/route";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export const fetchUserDataFromMongodb = async () => {
    const res = await fetch('/api/get_user')
    const result = await res.json()
    return result
}



export default function LoginForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const provider = new GoogleAuthProvider()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return Swal.fire("Error", "Please fill in all fields", "error");
        }

        const userData = await fetchUserDataFromMongodb()


        const existingUser = userData.find(user => user.email === email);

        if (existingUser) {
            setLoading(false)
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The user is already registered please Login",
            });
        }

        const fieldData = { name, email, password, date: new Date(), role: 'user' };

        try {
            // 1️⃣ Call your backend API


            // 2️⃣ Firebase Signup
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user.email) {
                const res = await users(fieldData);
                await updateProfile(user, { displayName: name });

                // 4️⃣ Success
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                route.push("/");

            }

            // 3️⃣ Update displayName


        } catch (error) {
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong",
            });
        } finally {
            setLoading(false)
        }
    };

    const handleGoogleLogIn = async () => {
        try {
            setLoading(true);

            const result = await signInWithPopup(auth, provider);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            if (!user?.email) return;

            const fieldData = {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
                password: user?.providerId,
                date: new Date(),
                role: 'user'
            }

            // Get users from MongoDB
            const userData = await fetchUserDataFromMongodb();

            const existingUser = userData.find(
                singleUser => singleUser.email === user.email
            );

            // If user does not exist, create new user
            if (!existingUser) {
                const res = await users(fieldData);
            }
            route.push("/");
            // Success alert
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: existingUser ? "Login successful!" : "Registration successful!",
                showConfirmButton: false,
                timer: 1500,
            });



        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
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
                    <div >
                        <label className="block text-white font-semibold mb-2">Password</label>
                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl bg-white/20 text-white placeholder-white/70 
               focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
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

                    <div className="mt-4">
                        {/* Sign Up Button (UNCHANGED) */}
                        <button
                            type="submit"
                            className={`w-full py-3 mt-3 rounded-2xl bg-gradient-to-r from-[#f050b3] to-[#a05bfc] text-white font-bold shadow-lg hover:scale-105 transition transform ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Signing...' : 'Sign up'}
                        </button>

                        {/* Divider */}
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
                <div className="mt-8 text-center">
                    <Link href='login' className="mt-8 text-white/70 text-center text-sm">
                        Already have an account? <span className="underline cursor-pointer">Login</span>
                    </Link>
                </div>


            </div>
        </div>
    );
}
