import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconPillProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

// A single bordered pill that holds both the icon and its input/text, so the
// icon sits inside the field instead of floating outside it and overlapping
// the border (the old layout used a negative margin to fake this and looked
// disconnected once the icon was a small vector glyph instead of a bespoke
// 50x50 image).
export default function IconPill({ icon, iconColor = "#F16886", children, style }: IconPillProps) {
  return (
    <View style={[styles.pill, style]}>
      <Ionicons name={icon} size={20} color={iconColor} style={styles.icon} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#F16886",
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
});
