import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Card } from "@/components/ui/card";
import type { PokemonSummary } from "@/types/pokemon";

type Props = {
  data: PokemonSummary[];
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
};

type GridItem =
  | (PokemonSummary & { __spacer?: false })
  | { id: string; __spacer: true };

function toGridData(items: PokemonSummary[]): GridItem[] {
  if (items.length % 2 === 1) {
    // add a spacer to make the last row have 2 columns
    return [...items, { id: "spacer", __spacer: true }];
  }
  return items;
}

export function CardList({ data, onEndReached, isFetchingNextPage }: Props) {
  const gridData = toGridData(data);

  return (
    <FlatList
      style={style.list}
      data={gridData}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={{ gap: 16, paddingBottom: 88, paddingTop: 5 }}
      columnWrapperStyle={{ alignItems: "stretch", gap: 16 }}
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
      renderItem={({ item }) => {
        if ("__spacer" in item && item.__spacer) {
          // invisible filler to keep 2-column layout
          return <View style={{ flex: 1 }} />;
        }
        return (
          <View style={{ flex: 1 }}>
            <Card pokemon={item} />
          </View>
        );
      }}
    ></FlatList>
  );
}

const style = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
