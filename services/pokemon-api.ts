import { PokemonClient } from 'pokenode-ts';

// Create a singleton instance of the Pokemon client
const PokeApiService = new PokemonClient();

// Export the service for use in hooks
export { PokeApiService };