'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserCardSkeleton from "../../Components/Skeleton/UserCardSkeleton";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Components/firebase";
import useAxiosSecure from "@/app/Hooks/useAxiosSecure";

const ADMIN_EMAIL = 'mdsazzadhosen472@gmail.com';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure('/api/get_user');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // listener only after component mounts
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user); // safe now
          
        });
    
        // cleanup when component unmounts
        return () => unsubscribe();
      }, []);

    if (loading) {
        return (
            <div className=" min-h-screen bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] p-8 pt-36">
                <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                    <UserCardSkeleton key={i} />
                ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] p-8 pt-36">

            <h1 className="text-4xl font-extrabold text-white text-center mb-12">
                👥 User Management
            </h1>

            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

                {users.map(user => (
                    <div
                        key={user._id}
                        className="relative backdrop-blur-xl bg-white/15 border border-white/20
            rounded-2xl p-6 text-white shadow-xl
            hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-yellow-300 text-purple-700
              flex items-center justify-center text-2xl font-bold mb-4">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                        <p className="text-sm opacity-90">{user.email}</p>

                        <div className="mt-4 text-xs opacity-70">
                            User ID: {user._id}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}
