"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-10 max-w-md text-center">
        <h1 className="text-5xl font-bold mb-4">🚫 Unauthorized</h1>
        <p className="mb-6 text-lg">
          You do not have permission to access this page.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-[#8E2DE2] to-[#EC4899] hover:from-[#EC4899] hover:to-[#8E2DE2] px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
