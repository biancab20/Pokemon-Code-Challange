import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { CardList } from "@/components/ui/cardList";
import { SearchBar } from "@/components/ui/searchBar";
import { usePokemonList } from "@/hooks/use-pokemon";

export default function Pokemons() {
  const {  data, isLoading, error } = usePokemonList(0, 150);

  if (isLoading) {
    return (
      <View style={style.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading Pokemon...</Text>
      </View>
    );
  }

  if (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <View style={style.centerContainer}>
        <Text>Error loading Pokémon: {message}</Text>
      </View>
    );
  }

  const count = data?.count ?? 0;
  const previews = data?.results ?? [];


  return (
    <SafeAreaView style={style.view} edges={["top", "left", "right"]}>
      <SearchBar></SearchBar>
      <Text style={style.title}>
        All Pokémon ({count})
      </Text>

      <CardList pokeData={previews}></CardList>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#EDF6FF",
  },
  title: {
    fontWeight: "bold",
    margin: 20,
    fontSize: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonItem: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
    borderRadius: 8,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  pokemonId: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
