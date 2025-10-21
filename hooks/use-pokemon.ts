import { useQuery } from "@tanstack/react-query";
import { PokeApiService } from "@/services/pokemon-api";
import type { NamedAPIResource } from "pokenode-ts";
import type { PokemonSummary } from "@/types/pokemon";
import {
  extractIdFromUrl,
  buildDetailPageImageUrl,
  buildPreviewImageUrl,
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
