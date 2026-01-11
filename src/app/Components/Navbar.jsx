"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const route = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setCurrentUser(user)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      route.push('login')
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <nav className="w-full fixed top-0 left-0 bg-white/20 backdrop-blur-lg border-b border-white/30 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href='/' className="flex-shrink-0 text-white font-bold text-2xl">
            SingaraOrder
          </Link>
          {/* Desktop Menu */}
          {
            currentUser ? (<div className="hidden md:flex space-x-6 text-white font-semibold">
              <Link href="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
              <Link href="/create_order" className="hover:text-yellow-300 transition">
                Create A Order
              </Link>
              <Link href="order" className="hover:text-yellow-300 transition">
                Orders
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition">
                Employees
              </Link>
              <Link href="#" className="hover:text-yellow-300 transition">
                Reports
              </Link>
              <Link onClick={handleLogout} href="#" className="hover:text-yellow-300 transition">
                Logout
              </Link>

            </div>) : (
              <div className="hidden md:flex space-x-6 text-white font-semibold">
                <Link href="login" className="hover:text-yellow-300 transition">Login</Link>
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
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4 text-white font-semibold">
            {
              currentUser ? (<div className="hidden md:flex space-x-6 text-white font-semibold">
                <Link href="/" className="hover:text-yellow-300 transition">
                  Home
                </Link>
                <Link href="/create_order" className="hover:text-yellow-300 transition">
                Create A Order
              </Link>
                <Link href="order" className="hover:text-yellow-300 transition">
                  Orders
                </Link>
                <Link href="#" className="hover:text-yellow-300 transition">
                  Employees
                </Link>
                <Link href="#" className="hover:text-yellow-300 transition">
                  Reports
                </Link>
                <Link href="#" className="hover:text-yellow-300 transition">
                  Logout
                </Link>

              </div>) : (
                <div className="hidden md:flex space-x-6 text-white font-semibold">
                  <Link href="login" className="hover:text-yellow-300 transition">Login</Link>
                </div>
              )
            }
          </div>
        )}
      </div>
    </nav>
  );
}
