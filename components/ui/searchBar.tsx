import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, TextInput } from "react-native";


export function SearchBar() {
return (
    <View style={style.wrapper}>
        <MaterialCommunityIcons name="magnify" size={20} style={style.icon} />
        <TextInput style={style.input} placeholderTextColor="#9AA0A6" placeholder="Search for Pokémon.." />
      </View>
);
}

const style = StyleSheet.create({
  wrapper: {
    margin: 12,
    position: "relative",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#303773",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: "center",
  },
  input: {
    height: "100%",
    paddingLeft: 40, // make room for the icon
    paddingRight: 12,
    fontSize: 16,
    color: "#0E0940",
  },
  icon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  }
});