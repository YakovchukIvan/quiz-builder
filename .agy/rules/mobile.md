# Mobile Architecture Rules (React Native & Expo)

## 1. Stack (Verified Working Versions)

- **Framework:** Expo SDK 54
- **Runtime:** React Native 0.81.5, React 19.1.0
- **Routing:** Expo Router v6
- **Styling:** NativeWind v4 + **Tailwind CSS v3** (`^3.4.17`)
- **Forms:** react-hook-form v7 + Zod v4
- **Data Fetching:** native `fetch` + `useState` / `useEffect` inside custom hooks
- **Language:** TypeScript 5

> ⚠️ CRITICAL: NativeWind v4 requires Tailwind CSS **v3**, NOT v4.
> Tailwind CSS v4 is only compatible with NativeWind v5 (currently unstable preview).
> Do NOT use `@import "tailwindcss"` syntax. Use `@tailwind base/components/utilities`.

## 2. Verified package.json Dependencies

These exact versions are confirmed working together. Do not change major/minor versions without re-verification:

```json
{
  "name": "mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~54.0.34",
    "expo-router": "~6.0.24",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-worklets": "0.5.1",
    "nativewind": "^4.2.6",
    "tailwindcss": "^3.4.17",
    "@hookform/resolvers": "^5.4.0",
    "react-hook-form": "^7.77.0",
    "zod": "^4.4.3",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.6.0",
    "lucide-react-native": "^1.21.0",
    "react-native-svg": "^15.0.0",
    "class-variance-authority": "^0.7.1"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "babel-preset-expo": "~13.0.0",
    "typescript": "~5.9.2"
  },
  "overrides": {
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "private": true
}
```

> Note: `lucide-react-native` is the React Native equivalent of `lucide-react` used on the web frontend.
> Icons API is identical: `import { Trash2 } from 'lucide-react-native'`.

## 3. Required Config Files

### `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
```

> ⚠️ Do NOT add `react-native-reanimated/plugin` or `react-native-worklets/plugin` manually.
> `babel-preset-expo` handles this automatically for Expo managed workflow.

### `metro.config.js`

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

### `global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: {} },
  plugins: [],
};
```

### `nativewind-env.d.ts`

```ts
/// <reference types="nativewind/types" />
```

## 4. Routing (Expo Router)

Mirror the Next.js App Router structure:

```bash
mobile/app/
├── _layout.tsx          # Root layout — imports global.css, wraps with SafeAreaProvider
├── index.tsx            # Redirect to /(tabs)/quizzes
└── (tabs)/
    ├── _layout.tsx      # Tab bar layout
    ├── quizzes/
    │   ├── index.tsx    # Quiz list screen
    │   └── [id].tsx     # Quiz detail screen
    └── create/
        └── index.tsx    # Quiz creation screen
```

## 5. UI & Styling (NativeWind)

- **Styling:** Use NativeWind `className` props exclusively. No `StyleSheet.create` unless absolutely required for animations.
- **Component Library:** Build Shadcn-inspired primitives in `src/components/ui/` — base components styled with NativeWind and `cn()`.
- **`cn()` utility:** `clsx` + `tailwind-merge`, identical to the web frontend.
- **Web → Native mapping:**

| Web (Shadcn/HTML) | Mobile (React Native)                 |
| ----------------- | ------------------------------------- |
| `<div>`           | `<View>`                              |
| `<p>`, `<span>`   | `<Text>`                              |
| `<button>`        | `<TouchableOpacity>` or `<Pressable>` |
| `<input>`         | `<TextInput>`                         |
| `<ScrollView>`    | `<ScrollView>`                        |
| `lucide-react`    | `lucide-react-native`                 |

## 6. Data Fetching Pattern

No external data-fetching library. Use this pattern in every hook:

```typescript
// src/hooks/useQuizzes.ts
import { useState, useEffect } from 'react';
import { fetchQuizzes } from '../lib/api';
import { QuizListItem } from '../lib/types';

export function useQuizzes() {
  const [data, setData] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

## 7. Forms & Validation

- **Forms:** `react-hook-form` with `@hookform/resolvers`.
- **Validation:** Zod schemas in `src/lib/schemas.ts` — must match the backend DTOs and web frontend schemas exactly.

## 8. Network & Platform

### API Base URL

```typescript
// src/lib/api.ts
import { Platform } from 'react-native';

const LOCAL_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${LOCAL_HOST}:3000`;
```

- Android Emulator → `10.0.2.2:3000`
- iOS Simulator → `localhost:3000`
- Physical device / production → set `EXPO_PUBLIC_API_URL` in `.env`

### Typing

- All API responses typed with interfaces from `src/lib/types.ts` (see `quiz-domain.md`).
- Never use `any`.

## 9. File Structure

```bash
mobile/
├── app/                    # Expo Router screens (thin — layout + render only)
├── src/
│   ├── components/
│   │   ├── ui/             # Primitives: Button, Input, Card, Badge...
│   │   └── quiz/           # Feature blocks: QuizCard, QuestionItem...
│   ├── hooks/              # useQuizzes, useQuiz, useCreateQuiz...
│   └── lib/
│       ├── api.ts          # API_BASE_URL + fetch functions
│       ├── schemas.ts      # Zod schemas (mirror frontend schemas)
│       └── types.ts        # TypeScript interfaces (from quiz-domain.md)
├── global.css
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── nativewind-env.d.ts
└── package.json
```
