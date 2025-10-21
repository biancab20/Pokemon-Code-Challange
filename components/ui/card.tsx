import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { PokemonCardProps } from "@/types/pokemon";

export function Card({ pokemon, onPress }: PokemonCardProps) {
  const router = useRouter();

  // const handlePress = (pokemonName: string) => {
  //   //if (onPress) return pokemon.name;
  //   router.push({
  //     pathname: `/pokemon/${pokemonName}`,
  //     params: { id: String(pokemon.id), name: pokemon.name },
  //   });
  // };

   const handlePress = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
  };

  return (
    <View style={style.shadowWrapper}>
      <Pressable onPress={() => handlePress(pokemon.name)} style={style.card}>
        <View style={style.imageContainer}>
          {pokemon.imageUrl ? (
            <ImageBackground
              source={{ uri: pokemon.imageUrl }}
              style={{ flex: 1, backgroundColor: "rgba(246, 246, 255, 1)" }}
              resizeMode="cover"
            >
              <View style={style.tagContainer}>
                <Text style={style.tagText}>
                  {String(pokemon.id).padStart(3, "0")}
                </Text>
              </View>
            </ImageBackground>
          ) : (
            <View style={{ flex: 1, backgroundColor: "pink" }}>
              <View style={style.tagContainer}>
                <Text style={style.tagText}>
                  {String(pokemon.id).padStart(3, "0")}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={style.textContainer}>
          <Text style={style.text}>{pokemon.name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  shadowWrapper: {
    shadowColor: "#30377326",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderRadius: 10,
    elevation: 5,
  },
  card: {
    aspectRatio: 0.8,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
  },
  tagContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#5631E8",
  },
  tagText: {
    textAlign: "center",
    borderRadius: 6,
    color: "#FFF",
    fontWeight: 500,
  },
  textContainer: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "left",
    fontWeight: 500,
    color: "#0E0940",
    textTransform: "capitalize",
  },
});
