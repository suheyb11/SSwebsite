// Shown the moment a dashboard page is asked for, while its data is fetched.
//
// Without this, a navigation leaves the previous page on screen with nothing
// happening — which reads as the dashboard having frozen rather than as it
// working. The shapes match what actually arrives (a heading, then either a
// table or a stack of panels), so the page does not jump when it does.
//
// The sidebar is in the layout, so it stays put and only this part is replaced.

export default function AdminLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="h-7 w-48 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-gray-100" />
      </div>

      {/* Rows */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="h-11 border-b border-gray-200 bg-gray-50" />

        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-gray-100 px-4 py-4 last:border-0">
            <div className="h-4 flex-1 rounded bg-gray-100" />
            <div className="hidden h-4 w-28 rounded bg-gray-100 sm:block" />
            <div className="hidden h-4 w-24 rounded bg-gray-100 md:block" />
            <div className="h-7 w-16 rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
