import { CardList } from "@/components/ui/cardList";
import { useFavorites } from "@/hooks/use-favorites";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const { data: favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>My Favorites</Text>
        </View>
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#5631E8" />
          <Text style={style.loadingText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !favorites) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return (
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>My Favorites</Text>
        </View>
        <View style={style.emptyContainer}>
          <Text style={style.emptyText}>Something went wrong</Text>
          <Text style={style.emptySubtext}>{message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (favorites.length === 0) {

    //state for empty list
    return (
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Text style={style.title}>My Favorites</Text>
        </View>
        <View style={style.emptyContainer}>
          <Text style={style.emptyText}>No favorites yet</Text>
          <Text style={style.emptySubtext}>
            Tap the heart icon on any Pokémon to add it to your favorites!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.view} edges={["top", "left", "right"]}>
      <Text style={style.title}>My favorites</Text>
      <CardList data={favorites}></CardList>
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
    marginTop: 24,
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#5631E8",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    lineHeight: 22,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
