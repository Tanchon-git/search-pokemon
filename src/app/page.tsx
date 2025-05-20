import { SearchInput } from "@/features/pokemon/components/SearchInput";

export default function HomePage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <SearchInput />
      <p className="text-gray-500">Search for a Pokémon above.</p>
    </div>
  );
}
