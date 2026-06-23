# Mobile Architecture Rules (React Native & Expo)

## 1. Framework & Routing Constraints

- **Framework:** Use **Expo** (latest version). Do not use React Native CLI bare workflow unless explicitly required for custom native modules.
- **Routing:** Use **Expo Router** (file-based routing) to mirror the Next.js App Router paradigm.
- **Screen Components:** Keep screen components in the `app/` directory minimal. They should primarily handle routing parameters, screen-level layout, and pass data to isolated UI components.

## 2. UI & Styling (NativeWind + Tailwind v4)

- **Styling:** Strictly use **NativeWind** to apply Tailwind CSS v4 classes directly to React Native components (e.g., `<View className="flex-1 bg-white">`). Do not use `StyleSheet.create` unless dealing with complex animations or specific React Native styling edge cases.
- **Component Library:** Emulate the **Shadcn UI** approach from the web frontend. Build reusable, unstyled base primitives (Buttons, Inputs, Cards) in `src/components/ui` and style them exclusively with NativeWind and `cn()` utility functions for conditional class merging.

## 3. State Management & Hooks

- **Data Fetching:** Use **TanStack Query** (React Query) combined with standard `fetch` or `axios` for server state and caching.
- **Custom Hooks:** Extract complex screen logic (especially related to API interactions, local state, and data formatting) into custom hooks located in `src/hooks`.
- **Single Responsibility:** A screen or component should strictly handle UI rendering. Heavy mapping, filtering, or state derivations MUST be moved to a hook.
- **Function Size Limits:** Maximum 10 logical conditions (`if/else`, `&&`, `||`) per function to prevent spaghetti code.

## 4. Forms & Validation

- **Forms:** Always use `react-hook-form` for complex forms (e.g., Authentication, Quiz interactions).
- **Validation:** Use `zod` for all form validation to maintain parity with the backend and web frontend. Ensure schema structures match the NestJS backend DTOs.

## 5. Network & Platform Constraints

- **Backend Connectivity:** Ensure the API base URL handles dynamic environments. When running the backend locally via Docker (`localhost:8000`), the mobile app must dynamically route API calls to `10.0.2.2:8000` for Android Emulators, while keeping `localhost:8000` or `127.0.0.1:8000` for iOS Simulators.
- **Strict TypeScript:** Absolutely no `any`. Ensure all API responses are properly typed with interfaces matching the backend's transformed responses.
- **File Structure:**
- `app/` for Expo Router screens.
- `src/components/` for feature-based blocks.
- `src/components/ui/` for core reusable elements.
- `src/hooks/` and `src/lib/` for logic and utilities.
