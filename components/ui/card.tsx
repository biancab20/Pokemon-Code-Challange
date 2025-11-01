import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  GestureResponderEvent,
  Share,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { PokemonCardProps } from "@/types/pokemon";
import { Icon } from "../icons/Icon";
import { ActionItem, ActionSheet } from "./actionSheet";
import { useIsFavorite, useToggleFavorite } from "@/hooks/use-favorites";
import { useState } from "react";

export function Card({ pokemon }: PokemonCardProps) {
  const router = useRouter();
  const [sheetVisible, setSheetVisible] = useState(false);

  const { data: isFavorited, isLoading: favLoading } = useIsFavorite(
    pokemon.id
  );
  const toggleFavorite = useToggleFavorite();

  const handlePress = (pokemonId: number, pokemonName: string) => {
    router.push({
      pathname: "/pokemon/[name]",
      params: { name: pokemonName, id: String(pokemonId) },
    });
  };

  const onMorePress = (e: GestureResponderEvent) => {
    e.stopPropagation?.(); // don’t trigger parent card press
    setSheetVisible(true);
  };

  const onToggleFavorite = async () => {
    if (favLoading || toggleFavorite.isPending) return;
    await Haptics.impactAsync(
      isFavorited
        ? Haptics.ImpactFeedbackStyle.Light
        : Haptics.ImpactFeedbackStyle.Medium
    );
    toggleFavorite.mutate({
      pokemonId: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      isCurrentlyFavorite: !!isFavorited,
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}! #${String(pokemon.id).padStart(
          3,
          "0"
        )}`,
        url: pokemon.imageUrl, // iOS uses this; Android uses message content
        title: `Pokémon • ${pokemon.name}`,
      });
    } catch {}
  };
  const favLabel = isFavorited ? "Remove from favorites" : "Add to favorites";
  const options: ActionItem[] = [
    {
      label: "Open Pokémon",
      icon: <Icon name="maximize" size={18} color="#006DF8" />,
      onPress: () => handlePress(pokemon.id, pokemon.name),
    },
    {
      label: favLabel,
      icon: <Icon name="heart" size={20} color="#006DF8" />,
      onPress: onToggleFavorite,
    },
    {
      label: "Share",
      icon: <Icon name="share" size={20} color="#006DF8" />,
      onPress: handleShare
    },
  ];

  return (
    <View style={style.shadowWrapper}>
      <Pressable
        onPress={() => handlePress(pokemon.id, pokemon.name)}
        style={style.card}
      >
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
          <Pressable onPress={onMorePress} hitSlop={10}>
            <Icon name="more" size={18} color="#0E0940" />
          </Pressable>
        </View>
      </Pressable>

      {/* Your custom sheet */}
      <ActionSheet
        visible={sheetVisible}
        options={options}
        onClose={() => setSheetVisible(false)}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  text: {
    textAlign: "left",
    fontWeight: 500,
    color: "#0E0940",
    textTransform: "capitalize",
  },
});
