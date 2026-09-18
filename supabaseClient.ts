import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPA_BASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPA_BASE_PUBLIC_ANNON_KEY;

const isConfigured =
  !!SUPABASE_URL &&
  !!SUPABASE_ANON_KEY &&
  /^https?:\/\//.test(SUPABASE_URL);

if (!isConfigured) {
  console.warn(
    'Supabase is not configured (EXPO_PUBLIC_SUPA_BASE_URL / EXPO_PUBLIC_SUPA_BASE_PUBLIC_ANNON_KEY ' +
      'are missing or still placeholder values in .env) - date ideas and feedback submission will be unavailable.'
  );
}

// `null` when misconfigured, rather than letting createClient() throw and
// crash the whole app on launch - only the features that actually use
// Supabase (DateGenerator, feedback) need to handle the null case.
export const supabase = isConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string)
  : null;
