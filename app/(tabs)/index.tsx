import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { CardList } from "@/components/ui/cardList";
import { SearchBar } from "@/components/ui/searchBar";
import { useInfinitePokemonList } from "@/hooks/use-pokemon";

export default function Pokemons() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePokemonList(50);
  
  const pages = data?.pages ?? [];
  const items = pages.flatMap((p) => p.results);
  //const total = pages[0]?.count ?? 0;

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

  return (
    <SafeAreaView style={style.view} edges={["top", "left", "right"]}>
      <SearchBar></SearchBar>
      <Text style={style.title}>All Pokémon ({items.length})</Text>

      <CardList data={items} isFetchingNextPage={isFetchingNextPage} onEndReached={() => { if (hasNextPage && !isFetchingNextPage) fetchNextPage();}}></CardList>
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
    marginHorizontal: 24,
    marginBottom:11,
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
