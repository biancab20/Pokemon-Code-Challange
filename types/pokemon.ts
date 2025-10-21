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
