import { EvolutionClient, PokemonClient } from "pokenode-ts";

// Create a singleton instance of the Pokemon client
const pokemonClient  = new PokemonClient();
const evolutionClient  = new EvolutionClient();

// Export the service for use in hooks
export const PokeApiService = {

  listPokemons: (offset: number, limit: number) =>
    pokemonClient.listPokemons(offset, limit),

  getPokemonByName: (name: string) =>
    pokemonClient.getPokemonByName(name),

  getSpeciesByName: (name: string) =>
    pokemonClient.getPokemonSpeciesByName(name),

  getEvolutionChainById: (id: number) =>
    evolutionClient.getEvolutionChainById(id),
};
