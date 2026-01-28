// components/ProfileSkeleton.jsx
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a855f7] via-[#c084fc] to-[#ec4899] px-4">
      <div className="relative w-full max-w-xl rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_40px_120px_rgba(0,0,0,0.25)] overflow-hidden animate-pulse">

        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-400/30 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-400/30 blur-3xl rounded-full"></div>

        {/* Header */}
        <div className="relative h-40 flex items-end justify-center">
          <div className="absolute top-6 right-6 w-16 h-6 rounded-full bg-gray-200"></div>

          <div className="relative z-10 -mb-16">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 p-[3px]">
              <div className="w-full h-full rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-8 pb-10 text-center relative z-10 space-y-6">
          {/* Name */}
          <div className="h-8 w-2/3 mx-auto bg-gray-200 rounded-lg"></div>

          {/* Email */}
          <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded"></div>

          {/* Info Cards */}
          <div className="mt-10 grid gap-4">
            <div className="h-14 rounded-2xl bg-gray-200"></div>
            <div className="h-14 rounded-2xl bg-gray-200"></div>
          </div>

          {/* Buttons */}
          <div className="mt-10 space-y-4">
            <div className="h-14 rounded-2xl bg-gray-300"></div>
            <div className="h-14 rounded-2xl bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
