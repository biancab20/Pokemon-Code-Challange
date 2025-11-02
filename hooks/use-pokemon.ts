import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokeApiService } from "@/services/pokemon-api";
import { mapForPreview, mapToDetails } from "@/utils/mappers";
import {
  parseNextOffset,
} from "@/utils/helpers";



export const usePokemonList = (offset: number = 0, limit: number = 150) => {
  return useQuery({
    queryKey: ["pokemon-list", offset, limit],
    queryFn: async () => {
      const data = await PokeApiService.listPokemons(offset, limit);
      const results = data.results.map(mapForPreview);

      return {
        count: data.count,
        results,
      };
    },
  });
};

export function useInfinitePokemonList(limit: number=50) {
  return useInfiniteQuery({
    queryKey:["pokemon-infinite-list", limit],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await PokeApiService.listPokemons(pageParam, limit);
      return {
        count: data.count,
        nextOffset: parseNextOffset(data.next),
        results: data.results.map(mapForPreview),
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });
}

export const usePokemonDetails = (name: string) =>
  useQuery({
    queryKey: ["pokemon-details", name],
    enabled: !!name,
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const [pokemon, species] = await Promise.all([
        PokeApiService.getPokemonByName(name),
        PokeApiService.getSpeciesByName(name),
      ]);

      const evoId = Number(
        species.evolution_chain?.url.split("/").filter(Boolean).pop()
      );
      const chain = await PokeApiService.getEvolutionChainById(evoId);

      return mapToDetails(pokemon, species, chain);
    },
  });
