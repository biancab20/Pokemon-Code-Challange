import { PokemonImage } from "@/components/ui/pokemon-image";
import { usePokemonByName } from "@/hooks/use-pokemon";
import { getTypeColor } from "@/utils/helpers";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams();
  const { data: pokemon, isLoading, error } = usePokemonByName(name as string);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5631E8" />
          <Text style={styles.loadingText}>Loading Pokémon...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !pokemon) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Pokémon not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.pokemonName}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
            <Text style={styles.pokemonId}>
              #{pokemon.id.toString().padStart(3, "0")}
            </Text>
          </View>

          <View style={styles.typesContainer}>
            {pokemon.types.map((typeInfo, index) => {
              const color = getTypeColor(typeInfo);
              const label =
                typeInfo.type.name.charAt(0).toUpperCase() +
                typeInfo.type.name.slice(1);

              return (
                <View key={index} style={styles.typeBadge}>
                  <View style={[styles.typeDot, { backgroundColor: color }]} />
                  <Text style={styles.typeText}>{label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.halfBackground}>
            <View style={styles.topHalf} />
            <View style={styles.bottomHalf} />
          </View>

          <PokemonImage id={pokemon.id} size={200} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Types</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
  },
  header: {
    paddingTop: 70,
    paddingHorizontal: 24,
    flexDirection: "column",
    paddingVertical: 20,
    backgroundColor: "#EDF6FF",
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0E0940",
    textTransform: "capitalize",
    lineHeight: 38,
    letterSpacing: 0,
  },
  pokemonId: {
    fontSize: 24,
    color: "#0E0940",
    opacity: 0.3,
    fontWeight: 400,
    lineHeight: 38,
    letterSpacing: 0,
  },
  imageContainer: {
    // alignItems: "center",
    // paddingVertical: 20,
    // backgroundColor: "#fff",
    //marginHorizontal: 16,
    // borderRadius: 12,
    // marginBottom: 16,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  halfBackground: {
    ...StyleSheet.absoluteFillObject, 
  },

  topHalf: {
    flex: 3,
    backgroundColor: "#EDF6FF",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E0940",
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(14, 9, 64, 0.08)",
    paddingStart: 12,
    paddingEnd: 14,
    paddingVertical: 4,
    borderRadius: 99,
  },
  typeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  typeText: {
    color: "rgba(14, 9, 64, 1)",
    fontWeight: 600,
    textTransform: "capitalize",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
});
