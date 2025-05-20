"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/pokemon/${encodeURIComponent(value.trim())}`);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label htmlFor="search" className="sr-only">
        Search Pokémon
      </label>
      <div className="flex items-center gap-2">
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Pokémon by name"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
