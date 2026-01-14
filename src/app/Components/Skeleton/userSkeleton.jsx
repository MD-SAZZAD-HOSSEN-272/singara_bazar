"use client";

export default function UserSkeleton() {
    return (
        <div className="animate-pulse bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] p-8 pt-36">

            <div className="max-w-7xl mx-auto flex flex-col min-h-screen gap-4 backdrop-blur-xl py-10 
      rounded-2xl text-white">
                {/* Navbar Skeleton */}
                <div className="h-16 rounded bg-gray-300"></div>

                {/* Main Content Skeleton */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                    <div className="h-40 rounded bg-gray-300"></div>
                </div>

                {/* Footer Skeleton */}
                <div className="h-16 rounded bg-gray-300"></div>
            </div>
        </div>
    );
}
