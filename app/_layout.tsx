import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Note: this app doesn't use @react-navigation/native's ThemeProvider —
// every screen supplies its own colors/styling directly (see the (tabs)
// screens), so there's no react-navigation header/theme to drive. As of
// SDK 56+, expo-router apps can no longer import ThemeProvider/DarkTheme/
// DefaultTheme from @react-navigation/native directly anyway.
export default function RootLayout() {
  const [loaded] = useFonts({
    k2dBold: require('../assets/fonts/K2D-Bold.ttf'),
    k2dLight: require('../assets/fonts/K2D-Light.ttf'),
    k2dMedium: require('../assets/fonts/K2D-Medium.ttf'),
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
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Favourites" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </>
  );
}
