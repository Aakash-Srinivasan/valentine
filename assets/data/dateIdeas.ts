// Local date-idea content for the Date Ideas generator. This used to be
// fetched from Supabase, but for a portfolio project that isn't actively
// maintained, a free-tier database that auto-pauses after a week of
// inactivity is a liability rather than a feature - keeping this content
// local means the feature always works, with nothing to keep alive.
export type DateMood = "romantic" | "chaotic" | "funny";

export const dateIdeas: Record<DateMood, string[]> = {
  romantic: [
    "Cook a candlelit dinner together and try a cuisine neither of you has made before.",
    "Watch the sunset from a rooftop or hill with a shared blanket and warm drinks.",
    "Write each other a letter about your favorite memory together, then read them aloud.",
    "Take a slow evening walk somewhere with string lights or a scenic view.",
    "Recreate your first date, down to the little details you remember.",
    "Stargaze somewhere quiet and try to name constellations - even if you're making them up.",
    "Slow dance in the living room to a playlist of \"your\" songs.",
    "Give each other a mini massage and light some candles.",
    "Plan a surprise picnic in a park you've never been to.",
    "Take a couple's photography walk and print your favorite shot afterward.",
    "Share a bottle of wine and talk about your five-year dreams together.",
    "Book a quiet spa evening at home with face masks and calming music.",
  ],
  chaotic: [
    "Flip a coin at every intersection to decide which way to go - no planning allowed.",
    "Try an escape room and see who panics first.",
    "Go-kart racing, and talk trash the whole time.",
    "Cook a meal using only ingredients you can find in 10 minutes at a corner store.",
    "Karaoke night where you can only sing songs picked at random.",
    "Try to learn a trending dance together in under 15 minutes.",
    "Blind taste-test the weirdest snack combinations you can find.",
    "Go thrift shopping with a small budget each and dress each other for dinner.",
    "Have a water balloon fight - no warnings, no mercy.",
    "Do an amusement park ride marathon - the scarier, the better.",
    "Sign up for improv comedy night on a whim.",
    "Hit a trivia night at a random bar - embarrassing team name mandatory.",
  ],
  funny: [
    "Recreate your most awkward couple photo, pose-for-pose.",
    "Do a couple's comedy roast - five minutes each, no holding back.",
    "Try to make each other laugh first without touching - loser buys dessert.",
    "Dress up as each other for a day (or at least try).",
    "Play the \"accent challenge\" - talk in a random accent all evening.",
    "Watch the worst-rated movie you can find and narrate it like a nature documentary.",
    "Attempt a cooking challenge blindfolded, judged by the other.",
    "Have a \"who knows me better\" quiz night with embarrassing personal trivia.",
    "Try a stand-up comedy open mic, even if you bomb.",
    "Recreate a dramatic soap-opera scene in your living room.",
    "Build the most ridiculous sandwich together and dare each other to eat it.",
    "Take turns narrating each other's day in an overly dramatic movie-trailer voice.",
  ],
};
