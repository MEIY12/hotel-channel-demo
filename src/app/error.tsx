'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 text-sm mb-6">
          This is usually a stale dev build. Stop the server, run{' '}
          <code className="bg-gray-200 px-1 rounded">npm run dev:clean</code>, then refresh.
        </p>
        <p className="text-xs text-gray-400 mb-6 break-all">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
