import { TYPE_COLORS } from "@/types/pokemon";
import { PokemonType } from "pokenode-ts";

export const extractIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match) throw new Error(`Cannot extract id from ${url}`);
  return Number(match[1]);
};

export const buildPreviewImageUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const buildDetailPageImageUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const parseNextOffset = (nextUrl?: string | null): number | undefined => {
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