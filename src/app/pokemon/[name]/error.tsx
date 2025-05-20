"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error loading Pokémon:", error);
  }, [error]);

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-4">
      <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
