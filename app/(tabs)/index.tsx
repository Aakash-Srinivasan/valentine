import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExternalLink } from "@/components/ExternalLink";
// Feedback button + modal used these - see the commented-out block below for
// why they're disabled (no working Supabase backend to submit feedback to).
// import { supabase } from "@/supabaseClient";
// import axios from "axios";
// import Toast from "react-native-toast-message";
// import LottieView from "lottie-react-native";
// import { AntDesign } from "@expo/vector-icons";

type MenuCard = {
  key: string;
  title: string;
  subtitle: string;
  route: string;
  colors: [string, string];
  // The first six cards keep their original illustration artwork (that's
  // the look the portfolio screenshots show); the rest use an icon-package
  // glyph since they never had bespoke art to begin with.
  image?: any;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
};

const menuCards: MenuCard[] = [
  {
    key: "flames",
    title: "FLAMES",
    subtitle: "Love starts here",
    route: "/(tabs)/ResultScreen",
    colors: ["#CB8EC1", "#B8A4E0"],
    image: require("../../assets/images/image1.svg"),
  },
  {
    key: "calc",
    title: "Love Calc",
    subtitle: "Check the capacity of love",
    route: "/(tabs)/Percentage",
    colors: ["#FF9291", "#FFD1BB"],
    image: require("../../assets/images/image2.svg"),
  },
  {
    key: "line",
    title: "Love Line",
    subtitle: "Pick Line for your love",
    route: "/(tabs)/PickupLineScreen",
    colors: ["#8CAAF1", "#DAE5FD"],
    image: require("../../assets/images/image3.svg"),
  },
  {
    key: "contract",
    title: "Love Contract",
    subtitle: "Make Love Agreement",
    route: "/(tabs)/LoveAgreementScreen",
    colors: ["#8DC19B", "#70B7E9"],
    image: require("../../assets/images/image4.svg"),
  },
  {
    key: "date",
    title: "Date Ideas",
    subtitle: "Explore with your love",
    route: "/(tabs)/DateGenerator",
    colors: ["#E88F99", "#F8C4CC"],
    image: require("../../assets/images/image5.svg"),
  },
  {
    key: "giggles",
    title: "LoveGiggles",
    subtitle: "Make your lovedOne smile",
    route: "/(tabs)/SmileGiver",
    colors: ["#76C9C6", "#BDE0F7"],
    image: require("../../assets/images/image6.svg"),
  },
  {
    key: "age",
    title: "Age Predictor",
    subtitle: "Guess your love age",
    route: "/(tabs)/AgePredictionScreen",
    colors: ["#F6D365", "#FDA085"],
    icon: "calendar",
  },
  {
    key: "coin",
    title: "Coin Toss",
    subtitle: "Let fate pick for you",
    route: "/(tabs)/CoinTossScreen",
    colors: ["#89F7FE", "#66A6FF"],
    icon: "disc",
  },
  {
    key: "star",
    title: "Star Match",
    subtitle: "Zodiac compatibility",
    route: "/(tabs)/StarMatchScreen",
    colors: ["#A18CD1", "#FBC2EB"],
    icon: "sparkles",
  },
  // "Truth or Dare" is hidden for now - the wheel only picks a random
  // player, it never actually shows a truth question or a dare challenge,
  // so today it doesn't do what its name promises. Re-add this card once
  // TruthOrDare.tsx has real question/challenge content wired in.
  // {
  //   key: "truth",
  //   title: "Truth or Dare",
  //   subtitle: "Play with your crew",
  //   route: "/(tabs)/TruthOrDare",
  //   colors: ["#667EEA", "#764BA2"],
  //   icon: "help-circle",
  // },
];

const HomeScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Feedback button + modal state/handlers - disabled along with the UI
  // below (no working Supabase backend to submit feedback to).
  // const [isFeedback, SetIsFeedback] = useState(false);
  // const [modalvisible, setmodalvisible] = useState(false);
  // const [feedback, setFeedback] = useState("");
  // const [loading, setLoading] = useState(false);
  // const telegramBotToken = process.env.EXPO_PUBLIC_TELEGRAM_BOT_TOKEN;
  // const telegramChatId = process.env.EXPO_PUBLIC_TELEGRAM_CHAT_ID;
  // const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  // const [rating, setRating] = useState<number>(0);
  //
  // const handlePress = (index: number) => {
  //   setRating(index + 1);
  // };
  //
  // const animationSources: Record<string, any> = {
  //   success: require("@/assets/animation/success.json"),
  // };
  //
  // const handleSubmit = async () => {
  //   if (!supabase) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Feedback isn't available right now",
  //       text2: "Please try again later",
  //     });
  //     return;
  //   }
  //
  //   try {
  //     setLoading(true);
  //
  //     const { error } = await supabase
  //       .from("feedback")
  //       .insert([{ feedback_text: feedback + rating }]);
  //
  //     if (error) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: error.message,
  //       });
  //       return;
  //     }
  //
  //     const response = await axios.post(telegramUrl, {
  //       chat_id: telegramChatId,
  //       text: `New Feedback: Rating ${rating} ${feedback}`,
  //     });
  //
  //     if (response.status === 200) {
  //       setRating(0);
  //       setFeedback("");
  //       setmodalvisible(false), SetIsFeedback(false), setFeedback("");
  //       Toast.show({
  //         type: "success",
  //         text1: "Feedback Sent!",
  //         text2: "Thanks for your thoughts 🙌",
  //         position: "top",
  //       });
  //     }
  //   } catch (err) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Something went wrong",
  //       text2: "Please try again later",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const HandleModalClose = () => {
  //   setmodalvisible(false), SetIsFeedback(false), setFeedback("");
  // };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={[styles.homeHeader, { paddingTop: insets.top + 12 }]}>
        <Image style={styles.logoMark} source={require("../../assets/icons/logo_mark.png")} />
        <Text style={styles.wordmark}>LoveLab</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom ,paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
      <View style={{ gap: 12 }}>
        {menuCards.map((card) => (
          <LinearGradient
            key={card.key}
            colors={card.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearContainer}
          >
            <TouchableOpacity
              style={styles.LinearGradientcontent}
              onPress={() => router.push(card.route as any)}
            >
              <View style={styles.textcontainer}>
                <Text style={[styles.btntitle]}>{card.title}</Text>
                <Text style={[styles.btnsubtitle]}>{card.subtitle}</Text>
              </View>

              {card.image ? (
                <Image style={styles.image} source={card.image} />
              ) : (
                <View style={styles.iconTile}>
                  <Ionicons name={card.icon} size={48} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          v{Constants.expoConfig?.version ?? "1.0.0"}
        </Text>
        <ExternalLink href="https://aakash-srinivasan.netlify.app/">
          <Text style={styles.footerLink}>Built by Aakash Srinivasan</Text>
        </ExternalLink>
      </View>
      </ScrollView>

      {/*
        Feedback button + modal disabled: this posted to Supabase, and both
        Supabase projects tied to this app are permanently paused (free-tier
        auto-pause), so submitting feedback would just fail silently. Leaving
        the code below in place in case a working backend gets wired up again.

      <View style={styles.btncontainer}>
        {!isFeedback && (
          <TouchableOpacity
            style={styles.fbbutton}
            onPress={() => SetIsFeedback(true)}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
          </TouchableOpacity>
        )}
        {isFeedback && (
          <TouchableOpacity
            style={styles.fbbuttonActive}
            onPress={() => setmodalvisible(true)}
          >
            <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
            <Text style={styles.fbButtonActiveText}>Feedback</Text>
          </TouchableOpacity>
        )}
        <Modal
          visible={modalvisible}
          style={styles.modalContainer}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {loading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <LottieView
                    source={animationSources.success}
                    autoPlay
                    style={{ width: 200, height: 200 }}
                  />
                  <Text style={styles.title}>Sending feedback...</Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.modaltitle}>Rate your experience</Text>
                    <TouchableOpacity onPress={HandleModalClose}>
                      <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.starsContainer}>
                    {[...Array(5)].map((_, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(index)}
                      >
                        <Ionicons
                          name={rating > index ? "star" : "star-outline"}
                          size={30}
                          color={rating > index ? "#FFD700" : "#ccc"}
                          style={styles.star}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text
                    style={{
                      fontFamily: "K2d-Medium",
                      fontSize: RFValue(16),
                      marginBottom: 20,
                    }}
                  >
                    Thanks,Why is the reason for your rating?
                  </Text>

                  <TextInput
                    placeholder="Add your feedback here..."
                    multiline
                    value={feedback}
                    onChangeText={setFeedback}
                    style={styles.textInput}
                  />
                  <Text
                    style={{
                      fontFamily: "K2d-Medium",
                      fontSize: RFValue(16),
                      marginBottom: 10,
                      color: "#818181",
                    }}
                  >
                    We value your feedback
                  </Text>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!feedback.trim()}
                    style={[
                      styles.button,
                      { opacity: feedback.trim() ? 1 : 0.5 },
                    ]}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
      */}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
  },
  star: {
    marginHorizontal: 5,
  },
  feedbackText: {
    marginTop: 10,
    fontSize: RFValue(16),
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "absolute",
    bottom: 0,
  },
  modaltitle: {
    fontSize: RFValue(20),
    fontFamily: "k2dBold",
  },

  linearContainer: {
    justifyContent: "center",
    width: "100%",
    height: 100,
    paddingLeft: 16,
    borderRadius: 8,
  },
  LinearGradientcontent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  btntitle: {
    marginTop: 6,
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "k2dBold",
    lineHeight: 25,
  },
  btnsubtitle: {
    fontSize: RFValue(14),
    width: "80%",
    color: "#fff",
    fontFamily: "k2dLight",
    lineHeight: 16,
    flexWrap: "wrap",
  },
  textcontainer: {
    width: 100,
    flexDirection: "column",
  },
  image: {
    width: 172,
    height: 100,
  },
  iconTile: {
    width: 172,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
    gap: 2,
  },
  footerText: {
    fontSize: RFValue(12),
    fontFamily: "k2dLight",
    color: "#999",
  },
  footerLink: {
    fontSize: RFValue(13),
    fontFamily: "k2dMedium",
    color: "#818181",
    textDecorationLine: "underline",
  },
  btncontainer: {
    alignItems: "center",
    marginTop: 20,
  },
  fbbutton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F16886",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fbbuttonActive: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F16886",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fbButtonActiveText: {
    color: "#fff",
    fontFamily: "k2dMedium",
    fontSize: RFValue(14),
  },
  textInput: {
    height: 100,
    textAlignVertical: "top",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fafafa",
    fontSize: RFValue(16),
    fontFamily: "K2d-Medium",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#17BB84",
    width: 248,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: RFValue(20),
    color: "#fff",
    fontFamily: "k2dBold",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  homeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    backgroundColor: "#fff",
  },
  logoMark: {
    width: 32,
    height: 32,
  },
  wordmark: {
    fontSize: RFValue(20),
    fontFamily: "k2dBold",
    color: "#F16886",
  },
});
