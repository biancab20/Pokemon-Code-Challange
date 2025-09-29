import { CardList } from "@/components/ui/cardList";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { pokemonData } from "@/constants/pokemon";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  return (
    <SafeAreaView style={style.view} edges={["top", "left", "right"]}>
      <Text style={style.title}>My favorites</Text>
      <CardList pokeData={pokemonData.filter((pokemon) => pokemon.id < 4)}></CardList>
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
});
