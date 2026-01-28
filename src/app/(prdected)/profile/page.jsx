"use client";

import { auth } from "@/app/Components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user || null);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    if (!currentUser) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a855f7] via-[#c084fc] to-[#ec4899] px-4">
            <div className="relative w-full max-w-xl rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_40px_120px_rgba(0,0,0,0.25)] overflow-hidden">

                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-400/40 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-400/40 blur-3xl rounded-full"></div>

                {/* Header */}
                <div className="relative h-40 flex items-end justify-center">
                    <div className="absolute top-6 right-6 px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                        ● Online
                    </div>

                    <div className="relative z-10 -mb-16">
                        <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-[#a855f7] to-[#ec4899] shadow-xl">
                            <div className="w-full h-full rounded-full bg-white overflow-hidden">
                                <Image
                                    src={currentUser.photoURL || "/avatar.png"}
                                    alt="Profile"
                                    width={128}
                                    height={128}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-20 px-8 pb-10 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {currentUser.displayName || "Anonymous User"}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 break-all">
                        {currentUser.email}
                    </p>

                    {/* Info Cards */}
                    <div className="mt-10 grid gap-4">
                        <div className="flex justify-between items-center rounded-2xl bg-white/70 border border-gray-200 px-5 py-4">
                            <span className="text-sm text-gray-500">User ID</span>
                            <span className="text-sm font-medium text-gray-800 truncate max-w-[220px]">
                                {currentUser.uid}
                            </span>
                        </div>

                        <div className="flex justify-between items-center rounded-2xl bg-white/70 border border-gray-200 px-5 py-4">
                            <span className="text-sm text-gray-500">Auth Provider</span>
                            <span className="text-sm font-medium text-gray-800">
                                Google
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 space-y-4">
                        <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] transition">
                            Update Profile
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full py-4 rounded-2xl bg-white border border-red-300 text-red-500 font-semibold hover:bg-red-50 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};