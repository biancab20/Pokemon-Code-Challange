import type { Pokemon, PokemonSpecies, EvolutionChain, ChainLink, NamedAPIResource } from "pokenode-ts";
import type { PokemonAbout, EvolutionNode, EvolutionPath, PokemonDetails, PokemonSummary } from "@/types/pokemon";
import { buildDetailPageImageUrl, buildPreviewImageUrl, extractIdFromUrl } from "./helpers";


export const mapForPreview = (resource: NamedAPIResource): PokemonSummary => {
  const id = extractIdFromUrl(resource.url);
  return {
    id,
    name: resource.name,
    imageUrl: buildPreviewImageUrl(id),
  };
};
export function mapToAbout(p: Pokemon): PokemonAbout {
  return {
    id: p.id,
    name: p.name,
    height: p.height, 
    weight: p.weight, 
    types: p.types,
    abilities: p.abilities,
    stats: p.stats,
    imageUrl: buildDetailPageImageUrl(p.id),
  };
}

// Flatten a simple "main path" for evolution (first branch).
function extractMainPath(link: ChainLink, acc: EvolutionNode[] = []): EvolutionNode[] {
  const id = Number(link.species.url.split("/").filter(Boolean).pop());
  const details = link.evolution_details?.[0];

  acc.push({
    id,
    name: link.species.name,
    trigger: details?.trigger?.name,
    minLevel: details?.min_level ?? undefined,
    itemName: details?.item?.name ?? undefined,
  });

  if (link.evolves_to && link.evolves_to.length > 0) {
    return extractMainPath(link.evolves_to[0], acc);
  }
  return acc;
}

export function mapEvolution(chain: EvolutionChain): EvolutionPath {
  return extractMainPath(chain.chain);
}

export function mapToDetails(p: Pokemon, _s: PokemonSpecies, chain: EvolutionChain): PokemonDetails {
  return {
    about: mapToAbout(p),
    evolution: mapEvolution(chain),
  };
}
