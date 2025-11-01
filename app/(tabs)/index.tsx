import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { CardList } from "@/components/ui/cardList";
import { useInfinitePokemonList } from "@/hooks/use-pokemon";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/ui/searchBar";

export default function Pokemons() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePokemonList(50);

const items = useMemo(() => {
  const pages = data?.pages ?? [];
  return pages.flatMap((p) => p.results);
}, [data?.pages]);

  // search state + light debounce for smooth typing
  const [queryRaw, setQueryRaw] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setQuery(queryRaw), 120);
    return () => clearTimeout(id);
  }, [queryRaw]);

  const isSearching = query.trim().length > 0;

  const filteredItems = useMemo(() => {
    if (!isSearching) return items;

    const q = query.trim().toLowerCase();
    const prefix: typeof items = [];
    const contains: typeof items = [];

    for (const p of items) {
      const name = p.name.toLowerCase();
      if (name.startsWith(q)) {
        prefix.push(p);
      } else if (name.includes(q)) {
        contains.push(p);
      }
    }

    // prefix matches first, then other substring matches
    return [...prefix, ...contains];
  }, [items, isSearching, query]);

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

  const listData = filteredItems;

  return (
    <SafeAreaView style={style.view} edges={["top", "left", "right"]}>
      <SearchBar value={queryRaw} onChangeText={setQueryRaw} />
      {!isSearching ? <Text style={style.title}>All Pokémon</Text> : <></>}

      {isSearching && listData.length === 0 ? (
        <View style={style.centerContainer}>
          <Text>No Pokémon found.</Text>
        </View>
      ) : (
        <CardList
          data={listData}
          isFetchingNextPage={!isSearching && isFetchingNextPage}
          onEndReached={
            isSearching
              ? undefined // don’t load more pages while filtering
              : () => {
                  if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                }
          }
        />
      )}
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
    marginBottom: 11,
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
