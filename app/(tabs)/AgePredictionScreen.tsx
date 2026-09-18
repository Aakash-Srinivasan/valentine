import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "@/components/AppHeader";

const AgePredictionScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [predictedAge, setPredictedAge] = useState<number | null>(null);
  const [predictedGender, setPredictedGender] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePredict = async () => {
    if (name.trim() === "") return; // Handle empty name input

    setLoading(true);
    setPredictedAge(null); // Reset previous age prediction
    setPredictedGender(null); // Reset previous gender prediction
    setError(null); // Reset previous error

    try {
      // Fetch age prediction
      const ageResponse = await axios.get(`https://api.agify.io?name=${name}`);
      setPredictedAge(ageResponse.data.age);

      // Fetch gender prediction
      const genderResponse = await axios.get(
        `https://api.genderize.io/?name=${name}`
      );
      setPredictedGender(genderResponse.data.gender);
    } catch (err) {
      setError("Failed to predict age or gender. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#F6D365", "#FDA085"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <AppHeader title="Age Predictor" onBack={() => router.back()} />
      <Text style={styles.title}>🔮 Predict Your Age & Gender 🔮</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={handlePredict}>
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>

      {loading && (
        <LottieView
          source={require("../../assets/animation/loading.json")} // Replace with your Lottie file path
          autoPlay
          loop
          style={styles.lottie}
        />
      )}

      {!loading && predictedAge !== null && predictedGender !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            The predicted age for <Text style={styles.highlight}>{name}</Text>{" "}
            is <Text style={styles.highlight}>{predictedAge}</Text> years old.
          </Text>
          <Text style={styles.result}>
            The predicted gender for{" "}
            <Text style={styles.highlight}>{name}</Text> is{" "}
            <Text style={styles.highlight}>{predictedGender}</Text>.
          </Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: RFValue(16),
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FF7755",
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
  lottie: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  result: {
    fontSize: RFValue(16),
    marginTop: 10,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
  },
  highlight: {
    color: "#FF7755",
    fontWeight: "bold",
  },
  error: {
    fontSize: RFValue(16),
    marginTop: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default AgePredictionScreen;
