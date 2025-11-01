import { PokemonSummary, TYPE_COLORS } from "@/types/pokemon";
import { PokemonType } from "pokenode-ts";
import { Share, Platform, InteractionManager } from "react-native";

export const extractIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match) throw new Error(`Cannot extract id from ${url}`);
  return Number(match[1]);
};

export const buildPreviewImageUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const buildDetailPageImageUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const parseNextOffset = (
  nextUrl?: string | null
): number | undefined => {
  if (!nextUrl) return undefined;
  try {
    const u = new URL(nextUrl);
    const off = u.searchParams.get("offset");
    return off ? Number(off) : undefined;
  } catch {
    return undefined;
  }
};

export function getTypeColor(type: PokemonType | string): string {
  const name = typeof type === "string" ? type : type.type.name;
  return TYPE_COLORS[name.toLowerCase()] ?? "#9AA0A6";
}

export function paramToString(p: string | string[] | undefined): string {
  if (Array.isArray(p)) return p[0];
  if (typeof p === "string") return p;
  throw new Error("Expected a route parameter but got undefined" + p);
}

export async function sharePokemonLinkWithPreview(
  pokemon: PokemonSummary,
  afterClose?: () => void
) {
  // Run after your ActionSheet has fully closed
  const run = async () => {
    const title = `#${String(pokemon.id).padStart(3, "0")} ${pokemon.name}`;
    const msg = `Check out this Pokémon! ${pokemon.name}`;
    const url = pokemon.imageUrl;

    try {
      if (Platform.OS === "ios") {
        await Share.share(
          url ? { title, message: msg, url } : { title, message: msg },
          { subject: title, dialogTitle: title }
        );
      } else {
        // Android prefers everything in `message`
        const message = url ? `${msg}\n${url}` : msg;
        await Share.share(
          { title, message },
          { subject: title, dialogTitle: title }
        );
      }
    } catch {}
  };

  // Wait until interactions (including your modal dismissal) finish
  if (afterClose) {
    afterClose();
    InteractionManager.runAfterInteractions(run);
  } else {
    InteractionManager.runAfterInteractions(run);
  }
}
