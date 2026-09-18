import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import LottieView from "lottie-react-native";

// Result animations, chosen by the calculated compatibility percentage
import animation0to16 from "../../assets/animation/enemy.json";
import animation17to33 from "../../assets/animation/warning.json";
import animation34to50 from "../../assets/animation/siblings.json";
import animation51to66 from "../../assets/animation/friends.json";
import animation67to83 from "../../assets/animation/love.json";
import animation84to100 from "../../assets/animation/marriage.json";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import AppHeader from "@/components/AppHeader";
import IconPill from "@/components/IconPill";

const getResultAnimation = (percent: number) => {
  if (percent <= 16) return animation0to16;
  if (percent <= 33) return animation17to33;
  if (percent <= 50) return animation34to50;
  if (percent <= 66) return animation51to66;
  if (percent <= 83) return animation67to83;
  return animation84to100;
};

const LoveCheckerScreen = () => {
  const router = useRouter();
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [name1Error, setName1Error] = useState("");
  const [name2Error, setName2Error] = useState("");
  const nameRegex = /^[A-Za-z\s'-]{2,50}$/;

  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      loadingAnim.setValue(0);
      Animated.loop(
        Animated.timing(loadingAnim, {
          toValue: 100,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    } else {
      loadingAnim.stopAnimation();
    }
  }, [loading]);

  const handleSubmit = () => {
    // Trim inputs to catch empty whitespace entries
    const trimmedName1 = name1.trim();
    const trimmedName2 = name2.trim();

    // Reset previous errors
    setName1Error("");
    setName2Error("");

    // Early validation: check if one name is missing
    if (trimmedName1 && !trimmedName2) {
      setName2Error("Give your crush's name.");
      return;
    }

    if (!trimmedName1 && trimmedName2) {
      setName1Error("Give your name.");
      return;
    }

    // Validate both fields
    let valid = true;

    if (!nameRegex.test(trimmedName1)) {
      setName1Error("Please give a valid name.");
      valid = false;
    }

    if (!nameRegex.test(trimmedName2)) {
      setName2Error("Please give a valid name.");
      valid = false;
    }

    if (!valid) return;

    // Proceed with logic
    setLoading(true);
    setShowResult(true);
    const percent = calculateLovePercentage(trimmedName1, trimmedName2);
    setPercentage(percent);


    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleback = () => {
    setPercentage(0);
    setName1("");
    setName2("");
    setShowResult(false);
    setLoading(false);
    router.back();
  };
  const handleReset = () => {
    setPercentage(0);
    setName1("");
    setName2("");
    setShowResult(false);
    setLoading(false);
  };

  const calculateLovePercentage = (n1: string, n2: string): number => {
    const fullString = `${n1.toLowerCase()}loves${n2.toLowerCase()}`.replace(
      /\s/g,
      ""
    );
    const countMap: { [key: string]: number } = {};
    const countList: number[] = [];

    for (let char of fullString) {
      if (!countMap[char]) {
        const count = fullString.split("").filter((c) => c === char).length;
        countMap[char] = count;
        countList.push(count);
      }
    }

    let current = countList;
    while (current.length > 2) {
      const next: number[] = [];
      let i = 0,
        j = current.length - 1;
      while (i <= j) {
        if (i === j) next.push(current[i]);
        else {
          const sum = current[i] + current[j];
          sum >= 10
            ? next.push(Math.floor(sum / 10), sum % 10)
            : next.push(sum);
        }
        i++;
        j--;
      }
      current = next;
    }

    return parseInt(current.join(""));
  };

  return (
    <LinearGradient
      colors={["#FF9492", "#FFD1BB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <AppHeader title="Love Calc" onBack={handleback} />
      <Image style={styles.bottomImage} source={require("../../assets/images/Calc.svg")} />
      {percentage ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.namesWrapper}>
            <Text style={styles.namesText}>{name1}</Text>

            <Ionicons name="heart" size={28} color="#FF6B81" />

            <Text style={styles.namesText}>{name2}</Text>
          </View>

          <View style={styles.progressContainer}>
            <IconPill icon="person-outline">
              <View style={styles.progressBarTrack}>
                {loading ? (
                  <Animated.View
                    style={[
                      styles.progressBarFill,
                      {
                        width: loadingAnim.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"],
                        }),
                      },
                    ]}
                  />
                ) : (
                  <View
                    style={[styles.progressBarFill, { width: `${percentage}%` }]}
                  />
                )}
              </View>
            </IconPill>
          </View>
          {!loading && (
            <>
              <View style={styles.percentageBadgeWrapper}>
                <Text style={styles.percentageInBadge}>{percentage}%</Text>
              </View>
              <LottieView
                source={getResultAnimation(percentage)}
                autoPlay
                loop
                style={styles.resultAnimation}
              />
            </>
          )}

          <TouchableOpacity onPress={handleReset}>
            <LinearGradient
              colors={["#F16886", "#FFCFBA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.askButton}
            >
              <Text style={styles.ButtonText}>Try with New Names</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.progressInputContainer}>
            <IconPill icon="person-outline">
              <TextInput
                style={styles.progressInput}
                placeholder="your name"
                placeholderTextColor="#999"
                value={name1}
                onChangeText={(text) => {
                  setName1(text);
                  if (name1Error) setName1Error(""); // clear error while typing
                }}
              />
            </IconPill>
          </View>

          {name1Error ? (
            <Text style={styles.errorText}>{name1Error}</Text>
          ) : null}

          <View style={styles.progressInputContainer}>
            <IconPill icon="person-outline">
              <TextInput
                style={styles.progressInput}
                placeholder="your Crush name"
                placeholderTextColor="#999"
                value={name2}
                onChangeText={(text) => {
                  setName2(text);
                  if (name2Error) setName2Error(""); // clear error while typing
                }}
              />
            </IconPill>
          </View>
          {name2Error ? (
            <Text style={styles.errorText}>{name2Error}</Text>
          ) : null}
          <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient
              colors={["#F16886", "#FFCFBA"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.askButton}
            >
              <Text style={styles.ButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

export default LoveCheckerScreen;

const styles = StyleSheet.create({
  bottomImage: {
    width: 250,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  progressInput: {
    width: "100%",
    height: "100%",
    color: "#000",
    fontSize: RFValue(16),
    fontWeight: "600",
  },
  progressInputContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    width: "100%",
  },

  namesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    gap: 6,
  },

  namesText: {
    fontSize: RFValue(20),
    fontWeight: "600",
    color: "white",
    marginHorizontal: 6,
  },

  percentageBadgeWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  resultAnimation: {
    width: 150,
    height: 150,
  },

  percentageInBadge: {
    fontSize: RFValue(22),
    fontWeight: "bold",
    color: "#fff",
  },

  percentageText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  progressContainer: {
    width: "80%",
    marginVertical: 20,
  },
  progressBarTrack: {
    width: "100%",
    height: 20,
    backgroundColor: "#F3E1E6",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#17BB84", // you can change this to any color you like
    borderRadius: 10,
  },
  askButton: {
    width: 248,
    padding: 10,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  ButtonText: {
    color: "#fff",
    fontFamily:'k2dMedium',
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    fontFamily: "k2dLight",
    fontSize: RFValue(12),
    lineHeight:12,
  },
  percentage: {
    fontSize: RFValue(64),
    fontWeight: "bold",
    color: "#7E8EFF",
  },
});
