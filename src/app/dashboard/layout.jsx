"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "../Hooks/useCurrentUser";
import UnauthorizedPage from "../Components/UnauthorizedPage";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const {currentUser, loading} = useCurrentUser()
  const route = useRouter()

  if(loading) return null

  console.log(currentUser)
  if(!currentUser){
    return route.push('login')
  }

  if(currentUser.email !== 'mdsazzadhosen472@gmail.com')return <UnauthorizedPage/>

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Settings", path: "/dashboard/admin/settings" },
  ];

  return (
    <div className="bg-gradient-to-br pt-16 from-[#8E2DE2] via-[#A855F7] to-[#EC4899] text-white font-sans min-h-screen">
      <div className="flex max-w-7xl mx-auto py-10 gap-6 relative">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-white/20 backdrop-blur px-3 py-2 rounded-lg"
        >
          ☰
        </button>

        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static top-0 left-0 h-full lg:h-auto
            w-64 p-6 rounded-r-2xl lg:rounded-2xl
            bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl
            transform transition-transform duration-300 z-50
            ${open ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>

            <button
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            {menu.map((item) => {
              const active = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      active
                        ? "bg-gradient-to-r from-[#8E2DE2] to-[#EC4899] shadow-lg"
                        : "hover:bg-white/20"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white text-gray-900 p-6 md:p-8 rounded-2xl shadow-xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
