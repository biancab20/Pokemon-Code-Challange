import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { BlurView } from "expo-blur";
import { Icon } from "@/components/icons/Icon";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 0,
          height: 68,
          backgroundColor: "rgba(237, 246, 255, 0.5)",
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarBackground: () => (
          <BlurView
            tint="light" // "light" | "dark" | "default"
            intensity={50} // 0–100
            style={StyleSheet.absoluteFill}
            experimentalBlurMethod={
              Platform.OS === "android" ? "dimezisBlurView" : undefined
            }
          />
        ),
        tabBarActiveTintColor: "#5631E8",
        tabBarInactiveTintColor: "#0E0940",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokémons",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={ focused  ? "pokeballFilled" : "pokeball"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={ focused  ? "heartFilled" : "heart"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
