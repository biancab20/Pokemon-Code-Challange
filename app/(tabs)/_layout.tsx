import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";

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
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView
            tint="light" // "light" | "dark" | "default"
            intensity={30} // 0–100
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pokeball" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
