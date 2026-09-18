import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  // "transparent" sits over a colored/gradient background (white text, no
  // bar); "solid" sits over a plain background (dark text, faint bar) - same
  // two looks used for pro-scanner's Header, adapted to this app's
  // full-bleed gradient screens instead of a SafeAreaView-wrapped Screen.
  variant?: "transparent" | "solid";
};

export default function AppHeader({ title, onBack, right, variant = "transparent" }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const isSolid = variant === "solid";
  const textColor = isSolid ? "#333" : "#fff";

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 10 },
        isSolid && styles.solidContainer,
      ]}
    >
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.backTouchable}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
            <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
              {title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sideRight}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  solidContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  side: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  backTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontFamily: "k2dMedium",
    fontSize: RFValue(20),
    textAlign: "center",
  },
  sideRight: {
    minWidth: 24,
    alignItems: "flex-end",
  },
});
