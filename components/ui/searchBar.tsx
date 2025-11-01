import { StyleSheet, View, TextInput } from "react-native";
import { Icon } from "../icons/Icon";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: Props) {

  return (
    <View style={style.wrapper}>
      <Icon name="search" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        style={style.input}
        placeholderTextColor="#9AA0A6"
        placeholder="Search for Pokémon.."
        accessibilityLabel="Search Pokémon"
      />
    </View>
  );
}

const style = StyleSheet.create({
  wrapper: {
    margin: 16,
    marginBottom: 32,
    flexDirection: "row",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#303773",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#0E0940",
  },
});
