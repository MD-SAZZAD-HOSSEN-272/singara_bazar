"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useRouter, usePathname } from "next/navigation";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u || null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!currentUser?.email) return;

    axiosSecure(`/api/users/single_user_by_email?email=${currentUser.email}`)
      .then(res => setUser(res.data))
      .catch(console.error);
  }, [currentUser, axiosSecure]);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    router.push("/login");
  };

  const navItem = (path) =>
    `block px-4 py-2 rounded-md transition text-sm font-medium
     ${pathname === path
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 lg:px-0">
        <div className="flex h-16 items-center justify-between px-5 lg:px-0">

          {/* Logo */}
          <Link href="/" className="text-lg font-semibold text-white">
            Singara<span className="text-indigo-400">Order</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {currentUser && (
              <>
                <Link href="/" className={navItem("/")}>Home</Link>
                <Link href="/items" className={navItem("/items")}>Items</Link>
                <Link href="/order" className={navItem("/order")}>Orders</Link>
                <Link href="/personal_order" className={navItem("/personal_order")}>Personal</Link>
                <Link href="/users" className={navItem("/users")}>Employees</Link>

                {user?.role === "admin" && (
                  <Link href="/dashboard" className={navItem("/dashboard")}>
                    Dashboard
                  </Link>
                )}

                <Link href="/profile" className={navItem("/profile")}>Profile</Link>

                <button
                  onClick={handleLogout}
                  className="ml-3 px-4 py-2 text-sm rounded-md bg-red-500/90 hover:bg-red-600 text-white"
                >
                  Logout
                </button>
              </>
            )}

            {!currentUser && (
              <>
                <Link href="/login" className={navItem("/login")}>Login</Link>
                <Link href="/register" className={navItem("/register")}>Register</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-slate-200 p-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-slate-900 border-t border-white/10
        transition-all duration-300 ease-in-out
        ${menuOpen ? "opacity-100 translate-y-0 z-50" : "opacity-0 -translate-y-4 pointer-events-none z-50"}`}
      >
        <div className="px-5 py-4 space-y-1">

          {currentUser ? (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/" className={navItem("/")}>Home</Link>
              <Link onClick={() => setMenuOpen(false)} href="/items" className={navItem("/items")}>Items</Link>
              <Link onClick={() => setMenuOpen(false)} href="/order" className={navItem("/order")}>Orders</Link>
              <Link onClick={() => setMenuOpen(false)} href="/personal_order" className={navItem("/personal_order")}>Personal</Link>
              <Link onClick={() => setMenuOpen(false)} href="/users" className={navItem("/users")}>Employees</Link>

              {user?.role === "admin" && (
                <Link onClick={() => setMenuOpen(false)} href="/dashboard" className={navItem("/dashboard")}>
                  Dashboard
                </Link>
              )}

              <Link onClick={() => setMenuOpen(false)} href="/profile" className={navItem("/profile")}>
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-2 text-left rounded-md bg-red-500/90 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/login" className={navItem("/login")}>Login</Link>
              <Link onClick={() => setMenuOpen(false)} href="/register" className={navItem("/register")}>Register</Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
