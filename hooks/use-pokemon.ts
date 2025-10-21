import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokeApiService } from "@/services/pokemon-api";
import type { NamedAPIResource } from "pokenode-ts";
import type { PokemonSummary } from "@/types/pokemon";
import {
  extractIdFromUrl,
  buildDetailPageImageUrl,
  buildPreviewImageUrl,
  parseNextOffset,
} from "@/utils/helpers";

const mapForPreview = (resource: NamedAPIResource): PokemonSummary => {
  const id = extractIdFromUrl(resource.url);
  return {
    id,
    name: resource.name,
    imageUrl: buildPreviewImageUrl(id),
  };
};

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

export const usePokemonByName = (name: string) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => PokeApiService.getPokemonByName(name),
    enabled: !!name, // Only run query if name is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
