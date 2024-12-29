import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import GlobalProvider from "@/lib/global-provider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Light: require("../assets/fonts/Rubik-Light.ttf"),
    Regular: require("../assets/fonts/Rubik-Regular.ttf"),
    Medium: require("../assets/fonts/Rubik-Medium.ttf"),
    Semibold: require("../assets/fonts/Rubik-SemiBold.ttf"),
    Bold: require("../assets/fonts/Rubik-Bold.ttf"),
    ExtraBold: require("../assets/fonts/Rubik-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GlobalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GlobalProvider>
    </ThemeProvider>
  );
}
