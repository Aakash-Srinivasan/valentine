# Cupid's Lab 💘

Cupid's Lab is a playful, Valentine-themed React Native app built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction/). It bundles a handful of lighthearted "love experiments" into one app — name compatibility checks, pickup lines, date night ideas, and a printable Love Agreement.

## Features

- **FLAMES Match** — the classic FLAMES (Friends, Love, Affection, Marriage, Enemy, Siblings) name-matching game, animated letter-by-letter elimination and all.
- **Love Percentage** — a name-based "love calculator" that produces a compatibility percentage, with a progress bar and a result animation that changes based on the score.
- **Pickup Lines** — fetches a random pickup line from a public API, with copy-to-clipboard and the ability to save favorites (view them later on the Favourites screen).
- **Date Ideas** — pick a date and a mood (romantic, chaotic, funny) and get a random date idea pulled from a Supabase table.
- **Love Agreement** — fill in two names and a date to generate a fun "Love Agreement" contract, previewed in-app and exported/shared as a PDF.
- **LoveGiggles** — fetches a random two-part joke and can read it aloud with text-to-speech.
- **Feedback** — an in-app feedback modal (star rating + comments) that stores submissions in Supabase and forwards a notification to a Telegram chat.

A few extra experiments (Age Prediction, Coin Toss, Truth or Dare, Star Sign Match) also live under `app/(tabs)/` as additional screens.

## Tech stack

- [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing) for the app shell and navigation
- React Native with TypeScript
- [Supabase](https://supabase.com) for the date-ideas dataset and feedback storage
- `expo-print` + `expo-sharing` to generate and share the Love Agreement PDF
- `lottie-react-native` for result animations
- Public APIs for pickup lines ([rizzapi](https://rizzapi.vercel.app)) and jokes ([JokeAPI](https://v2.jokeapi.dev))

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables

   Create a `.env` file in the project root (see the variables below). This file is git-ignored and should never be committed.

   ```
   EXPO_PUBLIC_TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
   EXPO_PUBLIC_TELEGRAM_CHAT_ID="your-telegram-chat-id"

   EXPO_PUBLIC_SUPA_BASE_URL="your-supabase-project-url"
   EXPO_PUBLIC_SUPA_BASE_PUBLIC_ANNON_KEY="your-supabase-anon-key"
   ```

   - The Supabase values are required for the Date Ideas and Feedback features to work; the app expects a `date_ideas` table (with `mood` and `idea` columns) and a `feedback` table (with a `feedback_text` column).
   - The Telegram values are optional — they're used to forward a notification whenever feedback is submitted.

3. Start the app

   ```bash
   npx expo start
   ```

   From the Expo CLI output you can open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), an Android emulator, an iOS simulator, or [Expo Go](https://expo.dev/go).

## Project structure

This project uses Expo Router's file-based routing. The main screens live under `app/(tabs)/`, with `index.tsx` as the home screen and each feature as its own screen/tab (`ResultScreen.tsx`, `Percentage.tsx`, `PickupLineScreen.tsx`, `DateGenerator.tsx`, `LoveAgreementScreen.tsx`, `SmileGiver.tsx`, etc.). Shared UI primitives live under `components/`, and `supabaseClient.ts` sets up the Supabase client used across the app.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Supabase documentation](https://supabase.com/docs)
