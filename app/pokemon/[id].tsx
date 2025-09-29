import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function Pokemon() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();

  return (
    <SafeAreaView style={styles.view}>
      <View>
        <Text style={styles.title}>{name ?? `#${id}`}</Text>
        {/* Add more detail UI here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#EDF6FF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0E0940",
    marginStart: 18,
  },
});
