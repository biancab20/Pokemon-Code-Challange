import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import Favorite from "./favorite";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { buildPreviewImageUrl, paramToString } from "@/utils/helpers";

type PokemonRouteParams = {
  name?: string | string[];
  id?: string | string[];
};

export function CustomStackNav({ navigation, route }: NativeStackHeaderProps) {
  const params = (route.params ?? {}) as Readonly<PokemonRouteParams>;
  const router = useRouter();

  const name = paramToString(params.name);
  const id = parseInt(paramToString(params.id));

  const imageUrl = buildPreviewImageUrl(id);

  return (
    <View style={style.container}>
      <BlurView
        intensity={50}
        tint="light"
        style={StyleSheet.absoluteFill}
        experimentalBlurMethod={
          Platform.OS === "android" ? "dimezisBlurView" : undefined
        }
      />

      <View style={style.row}>
        <View style={style.left}>
          <Pressable
            hitSlop={10}
            onPress={() =>
              router.canGoBack() ? router.back() : router.push("/")
            }
            style={style.backBtn}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="#000000" />
            <Text style={style.backText}>Back</Text>
          </Pressable>
        </View>

        <View style={style.right}>
          {name && id ? <Favorite id={id} name={name} imageUrl={imageUrl} /> : null}
        </View>
      </View>
    </View>
  );
}
const HEADER_HEIGHT = 100;
const style = StyleSheet.create({
  container: {
    position: "absolute",
    paddingTop: 60,
    paddingHorizontal: 17,
    paddingBottom: 16,
    height: HEADER_HEIGHT,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "rgba(237, 246, 255, 0.5)",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  left: { width: 91, justifyContent: "center" },
  right: { width: 48, alignItems: "flex-end", justifyContent: "center" },

  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#000000", fontSize: 17, fontWeight: 400 },
});
