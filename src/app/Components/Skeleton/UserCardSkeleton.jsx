'use client'

export default function UserCardSkeleton() {
  return (
    <div
      className="backdrop-blur-xl bg-white/10 py-10 border border-white/20
      rounded-2xl p-6 text-white shadow-xl animate-pulse"
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-white/30 mb-4"></div>

      {/* Name */}
      <div className="h-6 w-2/3 bg-white/30 rounded mb-2"></div>

      {/* Email */}
      <div className="h-4 w-full bg-white/20 rounded mb-4"></div>

      {/* ID */}
      <div className="h-3 w-3/4 bg-white/20 rounded"></div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <div className="flex-1 h-9 bg-white/30 rounded-lg"></div>
        <div className="flex-1 h-9 bg-white/30 rounded-lg"></div>
      </div>
    </div>
  )
}
