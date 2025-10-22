import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTanStackQueryDevTools } from '@rozenite/tanstack-query-plugin';


import { useColorScheme } from "@/hooks/use-color-scheme";
import { CustomStackNav } from "@/components/ui/customStackNav";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            // headerStyle: {
            //   backgroundColor: "transparent",
            // },
            // headerTintColor: "#000000",
             headerShadowVisible: false,
            //headerShown: true,
           header: () => <CustomStackNav />
          }}

        >
          <Stack.Screen name="(tabs)" options={{ title: "", headerShown: false }} />
          <Stack.Screen name="pokemon/[name]" options={{ title: "", headerShown: true }}/>
          {/* here you ca add the individual pokemon page */}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
