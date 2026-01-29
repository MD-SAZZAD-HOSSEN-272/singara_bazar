"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import Cart from "./Cart";

export default function Navbar({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const route = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    route.push('/login')
    signOut(auth).then(() => {
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <nav className="w-full fixed top-0 left-0 bg-black/50 backdrop-blur-lg border-b border-white/50 z-50">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href='/' className="flex-shrink-0 text-white font-bold text-2xl">
            SingaraOrder
          </Link>
          {/* Desktop Menu */}
          {
            currentUser ? (
              <div className="hidden md:flex space-x-6 text-white font-semibold">
                <Link href="/" className="hover:text-yellow-300 transition">
                  Home
                </Link>
                <Link href="/create_order" className="hover:text-yellow-300 transition">
                  Create A Order
                </Link>
                <Link href="/items" className="hover:text-yellow-300 transition">
                  Items
                </Link>
                <Link href="order" className="hover:text-yellow-300 transition">
                  Orders
                </Link>
                <Link href="personal_order" className="hover:text-yellow-300 transition">
                  Personal Orders
                </Link>
                <Link href="users" className="hover:text-yellow-300 transition">
                  Employees
                </Link>
                <Link href="#" className="hover:text-yellow-300 transition">
                  Reports
                </Link>
                <Link href='#'>
                  Dashboard
                </Link>
                <Link href="profile" className="hover:text-yellow-300 transition">
                  Profile
                </Link>
                <button onClick={handleLogout} className="hover:text-yellow-300 transition cursor-pointer">
                  Logout
                </button>

              </div>
            ) : (
              <div className="hidden md:flex space-x-6 text-white font-semibold">
                <Link href="/" className="hover:text-yellow-300 transition">
                  Home
                </Link>
                <Link href="login" className="hover:text-yellow-300 transition">Login</Link>
                <Link href="register" className="hover:text-yellow-300 transition">Register</Link>
              </div>
            )
          }

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4 text-white font-semibold">
            {currentUser ? (
              <>
                <Link href="/" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Home
                </Link>
                <Link href="/create_order" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Create A Order
                </Link>
                <Link href="/items" className="hover:text-yellow-300 transition">
                  Items
                </Link>
                <Link href="/order" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Orders
                </Link>
                <Link href="personal_order" className="hover:text-yellow-300 transition">
                  Personal Orders
                </Link>
                <Link href="/users" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Employees
                </Link>
                <Link href="profile" className="hover:text-yellow-300 transition">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block px-2 py-1 hover:text-yellow-300 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Home
                </Link>
                <Link href="/login" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Login
                </Link>
                <Link href="/register" className="block px-2 py-1 hover:text-yellow-300 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
