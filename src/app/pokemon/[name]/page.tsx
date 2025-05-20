import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";
import { PokemonDetail } from "@/features/pokemon/components/PokemonDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SearchInput } from "@/features/pokemon/components/SearchInput";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [
    { name: "Bulbasaur" },
    { name: "Charmander" },
    { name: "Squirtle" },
    { name: "Pikachu" },
  ];
}

export async function generateMetadata(props: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = await props.params;

  return {
    title: `Pokemon: ${name}`,
  };
}

const GET_POKEMON_BY_NAME = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      classification
      types
      resistant
      weaknesses
      maxHP
      maxCP
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;

export default async function PokemonPage(props: { params: { name: string } }) {
  const { name } = await props.params;

  const client = initializeApollo();

  try {
    const { data } = await client.query({
      query: GET_POKEMON_BY_NAME,
      variables: { name },
    });

    const pokemon = data.pokemon;

    if (!pokemon) notFound();

    return (
      <div className="p-6 max-w-xl mx-auto transition-opacity animate-fade-in">
        <SearchInput />
        <PokemonDetail pokemon={pokemon} />
      </div>
    );
  } catch (error) {
    throw error;
  }
}
