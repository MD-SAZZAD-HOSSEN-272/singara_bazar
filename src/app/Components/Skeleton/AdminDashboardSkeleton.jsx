export default function AdminDashboardSkeleton() {
  return (
    <div className="bg-gradient-to-br pt-16 from-[#8E2DE2] via-[#A855F7] to-[#EC4899] min-h-screen">
      <div className="flex max-w-7xl mx-auto py-10 gap-6">

        {/* Sidebar Skeleton */}
        <aside className="w-64 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="h-6 w-32 bg-white/30 rounded mb-8 animate-pulse" />

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-full bg-white/20 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl p-8">

          {/* Header */}
          <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse" />

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border bg-gray-50 shadow-sm"
              >
                <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="h-8 w-20 bg-gray-300 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border bg-gray-50 shadow-sm"
              >
                <div className="h-5 w-48 bg-gray-200 rounded mb-6 animate-pulse" />

                {/* Fake chart */}
                <div className="h-56 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
