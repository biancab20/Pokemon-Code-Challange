import type { PokemonType, PokemonAbility, PokemonStat } from "pokenode-ts";

//interfaces

export interface PokemonSummary {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface PokemonAbout {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  imageUrl?: string;
}

export interface EvolutionNode {
  id: number; // species id
  name: string;
  trigger?: string; // e.g. "level-up", "use-item"
  minLevel?: number;
  itemName?: string;
}

//types

export type PokemonCardProps = {
  pokemon: PokemonSummary;
  onPress?: (id: number) => void;
};

export type EvolutionPath = EvolutionNode[];

export type PokemonDetails = {
  about: PokemonAbout;
  evolution: EvolutionPath;
};

//from the figma file
export const TYPE_COLORS: Record<string, string> = {
  normal: "rgba(144, 153, 162, 1)",
  fire: "rgba(255, 79, 104, 1)",
  water: "rgba(77, 144, 214, 1)",
  electric: "rgba(255, 207, 0, 1)",
  grass: "rgba(100, 188, 85, 1)",
  ice: "rgba(125, 224, 208, 1)",
  fighting: "rgba(206, 63, 106, 1)",
  poison: "rgba(171, 106, 200, 1)",
  ground: "rgba(216, 118, 69, 1)",
  flying: "rgba(147, 169, 226, 1)",
  psychic: "rgba(131, 12, 185, 1)",
  bug: "rgba(143, 191, 43, 1)",
  rock: "rgba(196, 186, 133, 1)",
  ghost: "rgba(84, 106, 166, 1)",
  dragon: "rgba(6, 112, 190, 1)",
  dark: "rgba(92, 82, 98, 1)",
  steel: "rgba(90, 143, 161, 1)",
  fairy: "rgba(235, 144, 230, 1)",
  unknown: "rgba(182, 182, 182, 1)",
  shadow: "rgba(91, 82, 101, 1)",
};
