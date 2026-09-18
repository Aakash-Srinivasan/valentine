import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "@/components/AppHeader";

const TruthOrDareGame = () => {
  const router = useRouter();
  const [numPlayers, setNumPlayers] = useState("");
  const [players, setPlayers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;
  const [currentAngle, setCurrentAngle] = useState(0);

  const handleStart = () => {
    const num = parseInt(numPlayers);
    if (!isNaN(num) && num > 1) {
      const arr = Array.from({ length: num }, (_, i) => i + 1);
      setPlayers(arr);
      setSelectedPlayer(null);
      setShowPopup(false);
      spinValue.setValue(0);
      setCurrentAngle(0);
    }
  };

  const spinArrow = () => {
    const anglePerPlayer = 360 / players.length;
    const extraSpins = Math.floor(Math.random() * 3) + 4; // 4 to 6 full spins
    const randomFinalAngle = Math.random() * 360;
    const totalAngle = 360 * extraSpins + randomFinalAngle;

    const duration = Math.floor(Math.random() * 2000) + 3000;

    Animated.timing(spinValue, {
      toValue: currentAngle + totalAngle,
      duration,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      const finalAngle = (currentAngle + totalAngle) % 360;

      const playerIndex =
        Math.round(finalAngle / anglePerPlayer) % players.length;

      setCurrentAngle((prev) => prev + totalAngle);
      setSelectedPlayer(players[playerIndex]);
      setShowPopup(true);
    });
  };

  const handleCompleted = () => {
    setShowPopup(false);
    setSelectedPlayer(null);
  };

  const rotateArrow = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const renderPlayers = () => {
    const radius = 118;

    return players.map((num, index) => {
      const angle = (2 * Math.PI * index) / players.length;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const isSelected = num === selectedPlayer;

      return (
        <View
          key={index}
          style={[
            styles.playerCircle,
            {
              top: y + radius + 30,
              left: x + radius + 30,
              backgroundColor: isSelected ? "#FF4E6E" : "#fff",
            },
            isSelected && styles.playerCircleSelected,
          ]}
        >
          <Text style={[styles.playerText, isSelected && styles.playerTextSelected]}>{num}</Text>
        </View>
      );
    });
  };

  return (
    <LinearGradient
      colors={["#667EEA", "#764BA2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <AppHeader title="Truth or Dare" onBack={() => router.back()} />
      {players.length === 0 ? (
        <>
          <Text style={styles.title}>Enter number of players:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numPlayers}
            onChangeText={setNumPlayers}
            placeholder="e.g. 4"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.circleContainer}>
            <View style={styles.wheelRing} />
            {renderPlayers()}
            <View style={styles.hub} />
            <Animated.View
              style={[
                styles.arrow,
                {
                  transform: [{ rotate: rotateArrow }],
                },
              ]}
            >
              <View style={styles.arrowShaft} />
              <View style={styles.arrowTip} />
            </Animated.View>
          </View>
          <TouchableOpacity style={styles.spinButton} onPress={spinArrow}>
            <Text style={styles.buttonText}>Spin</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal visible={showPopup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              Player {selectedPlayer}: Truth or Dare?
            </Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={handleCompleted}
            >
              <Text style={styles.popupButtonText}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default TruthOrDareGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: RFValue(24),
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    borderWidth: 0,
    width: "80%",
    borderRadius: 10,
    padding: 12,
    textAlign: "center",
    fontSize: RFValue(18),
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  spinButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 30,
  },
  buttonText: {
    color: "#667EEA",
    fontSize: RFValue(18),
    fontWeight: "700",
  },
  circleContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  wheelRing: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  hub: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    zIndex: 11,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  arrow: {
    width: 12,
    height: 130,
    position: "absolute",
    top: 16,
    zIndex: 10,
    alignItems: "center",
  },
  arrowShaft: {
    width: 8,
    height: 100,
    backgroundColor: "#FFD166",
    borderRadius: 4,
  },
  arrowTip: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 22,
    borderTopColor: "#FF4E6E",
    borderLeftWidth: 11,
    borderLeftColor: "transparent",
    borderRightWidth: 11,
    borderRightColor: "transparent",
  },
  playerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  playerCircleSelected: {
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  playerText: {
    color: "#667EEA",
    fontWeight: "bold",
    fontSize: RFValue(16),
  },
  playerTextSelected: {
    color: "#fff",
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  popupText: {
    fontSize: RFValue(18),
    marginBottom: 20,
    fontWeight: "600",
  },
  popupButton: {
    backgroundColor: "#7E8EFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  popupButtonText: {
    color: "#fff",
    fontSize: RFValue(16),
  },
});
