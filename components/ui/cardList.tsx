import { View, FlatList, StyleSheet } from "react-native";
import { ICard } from "@/utils/interfaces";
import { Card } from "@/components/ui/card";

export function CardList({ pokeData }: { pokeData: ICard[] }) {
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
          <Card data={item} />
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
