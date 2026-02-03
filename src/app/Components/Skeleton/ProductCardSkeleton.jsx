"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-5 animate-pulse">
      
      {/* Image Skeleton */}
      <div className="h-40 w-full bg-gray-300 rounded-lg" />

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-300 rounded mt-4" />

      {/* Price */}
      <div className="h-4 w-1/3 bg-gray-200 rounded mt-2" />

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <div className="flex-1 h-10 bg-purple-300/40 rounded" />
        <div className="flex-1 h-10 bg-pink-300/40 rounded" />
      </div>
    </div>
  );
}
