import { Tabs } from "expo-router";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Note: every screen below sets tabBarStyle: { display: "none" } — this app
// never shows the native tab bar. Navigation between screens happens via
// buttons on the Home screen (see app/(tabs)/index.tsx) and back navigation,
// with expo-router's (tabs) group used only for file-based routing. Because
// the tab bar itself is never rendered, there's no need for a custom
// tabBarButton/tabBarBackground here (those relied on
// @react-navigation/elements and @react-navigation/bottom-tabs APIs that are
// no longer usable directly alongside expo-router as of SDK 56+).
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme === "dark" ? "dark" : "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="ResultScreen"
        options={{
          title: "FLAMES Match",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="Percentage"
        options={{
          title: "Love Percentage",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="PickupLineScreen"
        options={{
          title: "Pickup Lines",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="AgePredictionScreen"
        options={{
          title: "Age Prediction",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="CoinTossScreen"
        options={{
          title: "Coin Toss",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="TruthOrDare"
        options={{
          title: "Truth or Dare",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="LoveAgreementScreen"
        options={{
          title: "Love Agreement",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="StarMatchScreen"
        options={{
          title: "Star Sign Match",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="DateGenerator"
        options={{
          title: "Date Ideas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
      <Tabs.Screen
        name="SmileGiver"
        options={{
          title: "LoveGiggles",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarStyle: { display: "none" }, // Hide the tab bar on this screen
        }}
      />
    </Tabs>
  );
}
