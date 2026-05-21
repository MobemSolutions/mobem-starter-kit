export default function Loading() {
  return (
    <div className="min-h-screen bg-(--background) animate-pulse" aria-busy="true" aria-label="Chargement…">
      {/* Header skeleton */}
      <div className="h-16 border-b border-(--border) flex items-center px-6">
        <div className="h-5 w-32 rounded bg-(--secondary)" />
        <div className="ml-auto flex gap-6">
          <div className="h-4 w-16 rounded bg-(--secondary)" />
          <div className="h-4 w-16 rounded bg-(--secondary)" />
          <div className="h-4 w-16 rounded bg-(--secondary)" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="h-[60vh] bg-(--secondary)" />

      {/* Section skeleton */}
      <div className="mx-auto max-w-[1280px] px-6 py-24 space-y-6">
        <div className="h-3 w-24 rounded bg-(--secondary)" />
        <div className="h-8 w-80 rounded bg-(--secondary)" />
        <div className="h-4 w-full rounded bg-(--secondary)" />
        <div className="h-4 w-3/4 rounded bg-(--secondary)" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 rounded bg-(--secondary)" />
          ))}
        </div>
      </div>
    </div>
  )
}
