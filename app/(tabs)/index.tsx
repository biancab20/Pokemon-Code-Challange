import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { CardList } from "@/components/ui/cardList";
import { pokemonData } from "@/constants/pokemon";
import { SearchBar } from "@/components/ui/searchBar";


export default function Pokemons() {
  return (
    <SafeAreaView style={style.view} edges={['top', 'left', 'right']}>
      <SearchBar></SearchBar>
      <Text style={style.title}>All Pokémon</Text>
      <CardList pokeData={pokemonData}></CardList>
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
