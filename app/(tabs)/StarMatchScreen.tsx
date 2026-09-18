import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "@/components/AppHeader";

// Interface for compatibility result
interface MatchResult {
  sign1: string;
  sign2: string;
  score: number;
  message: string;
}

// Get zodiac sign from a date
const getZodiacSign = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius ♒";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return "Pisces ♓";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return "Aries ♈";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "Taurus ♉";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return "Gemini ♊";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return "Cancer ♋";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return "Virgo ♍";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return "Libra ♎";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio ♏";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius ♐";
  return "Capricorn ♑";
};

// Compatibility chart
const compatibilityChart: Record<
  string,
  Record<string, { score: number; message: string }>
> = {
  "Aries ♈": {
    "Gemini ♊": { score: 88, message: "Fire + Air = explosive fun! 💥" },
    "Cancer ♋": {
      score: 45,
      message: "One’s fiery, one’s feelsy. Could be spicy 🌶️",
    },
  },
  "Gemini ♊": {
    "Aries ♈": {
      score: 88,
      message: "Y’all are made for memes & mischief 😈",
    },
  },
};

// Safe compatibility fetcher
const getCompatibility = (
  sign1: string,
  sign2: string
): { score: number; message: string } => {
  const [s1, s2] = [sign1, sign2].sort();
  if (s1 in compatibilityChart && s2 in compatibilityChart[s1]) {
    return compatibilityChart[s1][s2];
  }
  return {
    score: Math.floor(Math.random() * 51) + 30, // 30 to 80
    message: "The stars say it’s a mystery, but sparks could fly! 💫",
  };
};

export default function StarMatchScreen() {
  const [date1, setDate1] = useState<Date>(new Date());
  const [date2, setDate2] = useState<Date>(new Date());
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const router = useRouter();
  const handleMatch = () => {
    const sign1 = getZodiacSign(date1);
    const sign2 = getZodiacSign(date2);
    const match = getCompatibility(sign1, sign2);
    setResult({ sign1, sign2, score: match.score, message: match.message });
  };
  const handleback = () => {
    setDate1(new Date());
    setDate2(new Date());
    setResult(null);
    router.back();
  };
  return (
    <LinearGradient
      colors={["#A18CD1", "#FBC2EB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <AppHeader title="Star Match" onBack={handleback} />
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔮 Star Match</Text>

      <Text style={styles.label}>Your Birthdate</Text>
      <TouchableOpacity
        style={[styles.input, styles.dateInput]}
        onPress={() => setShowDatePicker1(true)}
        accessibilityLabel="Select your birthdate"
        accessibilityRole="button"
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <Text style={styles.dateText}>{date1.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Partner Birthdate</Text>
      <TouchableOpacity
        style={[styles.input, styles.dateInput]}
        onPress={() => setShowDatePicker2(true)}
        accessibilityLabel="Select their birthdate"
        accessibilityRole="button"
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <Text style={styles.dateText}>{date2.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker1 && (
        <DateTimePicker
          value={date1}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker1(Platform.OS === "ios" ? true : false);
            if (selectedDate && event.type !== "dismissed") {
              setDate1(selectedDate);
            }
          }}
        />
      )}
      {showDatePicker2 && (
        <DateTimePicker
          value={date2}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker2(Platform.OS === "ios" ? true : false);
            if (selectedDate && event.type !== "dismissed") {
              setDate2(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity
        onPress={handleMatch}
        style={styles.button}
        accessibilityLabel="Reveal your zodiac compatibility"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>✨ Reveal Match</Text>
      </TouchableOpacity>

      {!result && (
        <Text style={styles.placeholder}>
          Pick two birthdates to find your star match ✨
        </Text>
      )}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultSigns}>
            {result.sign1} + {result.sign2}
          </Text>
          <Text style={styles.resultScore}>{result.score}%</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>
        </View>
      )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: 90,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: RFValue(28),
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  label: {
    fontSize: RFValue(18),
    marginTop: 20,
    alignSelf: "flex-start",
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  dateText: {
    color: "#333",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: "#A18CD1",
    fontSize: RFValue(18),
    fontWeight: "700",
  },
  placeholder: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#fff",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  resultSigns: {
    fontSize: RFValue(20),
    color: "#333",
  },
  resultScore: {
    fontSize: RFValue(40),
    fontWeight: "bold",
    color: "#A18CD1",
    marginVertical: 10,
  },
  resultMessage: {
    fontSize: RFValue(16),
    textAlign: "center",
    color: "#555",
  },
});
