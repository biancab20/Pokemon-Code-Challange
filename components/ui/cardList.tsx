import { View, FlatList, StyleSheet } from "react-native";
import { Card } from "@/components/ui/card";
import type { PokemonSummary } from "@/types/pokemon";

export function CardList({ pokeData }: { pokeData: PokemonSummary[] }) {
  return (
    <FlatList
      style={style.list}
      data={pokeData}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={{ gap: 12, paddingBottom: 88 }}
      columnWrapperStyle={{ alignItems: "stretch", gap: 12 }}
      showsVerticalScrollIndicator={false}
      
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <Card pokemon={item} />
        </View>
      )}
    ></FlatList>
  );
}

const style = StyleSheet.create({
  list: {
    flex: 1,
    marginHorizontal: 18,
  },
});
