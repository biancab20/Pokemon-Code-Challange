import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "@/components/ui/card";
import type { PokemonSummary } from "@/types/pokemon";

type Props = {
  data: PokemonSummary[];
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
};

export function CardList({ data, onEndReached, isFetchingNextPage }: Props) {
  return (
    <FlatList
      style={style.list}
      data={data}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={{ gap: 12, paddingBottom: 88, paddingTop: 10}}
      columnWrapperStyle={{ alignItems: "stretch", gap: 12 }}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ paddingVertical: 16 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
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
    paddingHorizontal:18,
  },
});
