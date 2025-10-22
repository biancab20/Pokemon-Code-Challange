import { buildDetailPageImageUrl } from "@/utils/helpers";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface PokemonImageProps {
  id: number;
  size?: number;
}

export function PokemonImage({ id, size = 200 }: PokemonImageProps) {
  const imageUrl = buildDetailPageImageUrl(id);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    backgroundColor: "transparent",
  },
});
