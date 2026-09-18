// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // eslint-config-expo's SDK 57 update pulls in eslint-plugin-react-hooks'
    // v6 "recommended" rules, which are React Compiler readiness checks, not
    // classic correctness rules. This app doesn't opt into React Compiler,
    // and these rules false-positive on standard, correct RN patterns used
    // throughout the codebase:
    //  - react-hooks/refs & react-hooks/immutability: flag the common
    //    `useRef(new Animated.Value(0)).current` idiom (and similar
    //    read-during-render access) used for stable Animated.Value refs.
    //  - react-hooks/purity: flags Math.random() used inside functions that
    //    are only ever invoked from event handlers (e.g. spin/toss logic),
    //    not during render.
    //  - react-hooks/set-state-in-effect: flags the standard
    //    `useEffect(() => { loadData() }, [])` on-mount data-loading
    //    pattern, even when the actual setState call happens after an
    //    `await` (i.e. never synchronously within the effect).
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
