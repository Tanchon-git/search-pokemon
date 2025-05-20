"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";

const GET_POKEMON_ID_BY_NAME = gql`
  query GetPokemonId($name: String!) {
    pokemon(name: $name) {
      id
    }
  }
`;

export function SearchInput() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!value.trim()) {
      setError("Please enter a Pokémon name.");
      setIsLoading(false);
      return;
    }

    const pokemonName = value.trim();

    try {
      const client = initializeApollo();
      const { data } = await client.query({
        query: GET_POKEMON_ID_BY_NAME,
        variables: { name: pokemonName },
      });

      if (data.pokemon) {
        router.push(`/pokemon/${encodeURIComponent(pokemonName)}`);
        setValue("");
      } else {
        setError(
          `Pokémon "${pokemonName}" not found. Please try another name.`
        );
      }
    } catch (err) {
      console.error("Error during Pokémon search:", err);
      setError("An error occurred during search. Please try again.");
    } finally {
      setIsLoading(false);
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
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
