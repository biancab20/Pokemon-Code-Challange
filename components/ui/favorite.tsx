import { useIsFavorite, useToggleFavorite } from "@/hooks/use-favorites";
import { TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { Icon } from "../icons/Icon";
import { PokemonSummary } from "@/types/pokemon";


export default function Favorite({ ...props }: PokemonSummary) {
  const { data: isFavorited, isLoading } = useIsFavorite(props.id);
  const toggleFavorite = useToggleFavorite();

  const handleToggle = async () => {
    if (isLoading) return;

    await Haptics.impactAsync(
      isFavorited
        ? Haptics.ImpactFeedbackStyle.Light
        : Haptics.ImpactFeedbackStyle.Medium
    );

    toggleFavorite.mutate({
      pokemonId: props.id,
      name: props.name,
      imageUrl: props.imageUrl,
      isCurrentlyFavorite: isFavorited || false,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      disabled={toggleFavorite.isPending}
    >
      <Icon
        name={isFavorited ? "heartFilled" : "heart"}
        size={24}
        color={isFavorited ? "#FF4F68" : "#0E0940"}
      />
    </TouchableOpacity>
  );
}

