import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "@/components/AppHeader";

const CoinTossScreen: React.FC = () => {
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const moveValue = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const rotateInterpolate = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const translateInterpolate = moveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200], // toss height
  });

  const flipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);

    const newResult = Math.random() < 0.5 ? "Heads" : "Tails";

    spinValue.setValue(0);
    moveValue.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(moveValue, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(moveValue, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(spinValue, {
        toValue: newResult === "Heads" ? 720 : 900,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setResult(newResult);
      setIsFlipping(false);
    });
  };

  return (
    <LinearGradient
      colors={["#89F7FE", "#66A6FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <AppHeader title="Coin Toss" onBack={() => router.back()} />
      <Text style={styles.title}>🪙 Toss the Coin</Text>

      <Animated.View
        style={[
          styles.coin,
          {
            transform: [
              { translateY: translateInterpolate },
              { rotateY: rotateInterpolate },
            ],
          },
        ]}
      >
        <Image
          source={
            result === "Heads"
              ? require("../../assets/images/haed.png")
              : require("../../assets/images/tail.png")
          }
          style={styles.image}
        />
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={flipCoin}
        disabled={isFlipping}
      >
        <Text style={styles.buttonText}>
          {isFlipping ? "Flipping..." : "Flip Coin"}
        </Text>
      </TouchableOpacity>

      {result && !isFlipping && (
        <Text style={styles.resultText}>🎉 It&apos;s {result}!</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingTop: 100,
  },
  title: {
    fontSize: RFValue(28),
    fontWeight: "700",
    marginBottom: 10,
    color: "#fff",
  },
  coin: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 40,
  },
  buttonText: {
    color: "#3E6FE0",
    fontSize: RFValue(18),
    fontWeight: "700",
  },
  resultText: {
    fontSize: RFValue(22),
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
  },
});

export default CoinTossScreen;
