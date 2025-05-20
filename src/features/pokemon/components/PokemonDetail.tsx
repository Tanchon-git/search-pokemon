"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  id: string;
  name: string;
  image: string;
}

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  maxHP: number;
  maxCP: number;
  classification: string;
  resistant: string[];
  weaknesses: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: Evolution[];
}

export function PokemonDetail({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          className="w-40 h-40 object-contain"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{pokemon.name}</h2>
          <p className="text-sm text-gray-600">{pokemon.classification}</p>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type: string) => (
              <span
                key={type}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-700">
            <p>
              <strong>Max HP:</strong> {pokemon.maxHP}
            </p>
            <p>
              <strong>Max CP:</strong> {pokemon.maxCP}
            </p>
            <p>
              <strong>Resistant:</strong> {pokemon.resistant.join(", ")}
            </p>
            <p>
              <strong>Weaknesses:</strong> {pokemon.weaknesses.join(", ")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mt-4">Fast Attacks</h3>
            <ul className="text-sm list-disc ml-5">
              {pokemon.attacks.fast.map((a: any) => (
                <li key={a.name}>
                  {a.name} ({a.type}, {a.damage} dmg)
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mt-4">Special Attacks</h3>
            <ul className="text-sm list-disc ml-5">
              {pokemon.attacks.special.map((a: any) => (
                <li key={a.name}>
                  {a.name} ({a.type}, {a.damage} dmg)
                </li>
              ))}
            </ul>
          </div>

          {pokemon.evolutions?.length > 0 && (
            <div>
              <h3 className="font-semibold mt-4">Evolutions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {pokemon.evolutions.map((evo: any) => (
                  <a
                    key={evo.id}
                    href={`/pokemon/${evo.name}`}
                    className="text-center hover:underline"
                  >
                    <Image
                      src={evo.image}
                      alt={evo.name}
                      className="w-20 h-20 mx-auto object-contain"
                    />
                    <p className="text-sm">{evo.name}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
