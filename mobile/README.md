# AlwaysOnVPN Mobile

Ultra-lightweight Expo (React Native) mobile app for AlwaysOnVPN.

## Stack
- **Expo SDK 52** + React Native 0.76
- **React Navigation** (bottom-tabs + native)
- **Lucide React Native** icons
- **React Context** for in-session state
- **TypeScript strict mode**

## Screens
1. **Home / Connect** — Big shield toggle, live throughput, gateway details
2. **Locations** — 12 global server locations with ping & load indicators
3. **Settings** — Toggles, protocol picker, theme

## Quick start

```bash
cd mobile
npm install
npm run start          # Expo dev server (scan QR with Expo Go)
npm run android        # Launch on Android emulator
npm run ios            # Launch on iOS simulator (Mac only)
npm run ts:check       # Strict TypeScript compile check
```

## Local Android build (produces APK)

Requires Java 17 and Android SDK (or use the GitHub Actions workflow).

```bash
cd mobile
npm install
npx expo prebuild --platform android --no-install
cd android
./gradlew assembleRelease
# -> app/build/outputs/apk/release/app-release.apk
```

## GitHub Actions

Workflow file: [`.github/workflows/mobile-build.yml`](../.github/workflows/mobile-build.yml)

Triggers:
- Push / PR to `main` or `master` (paths under `mobile/**`)
- Release publish (adds APK to release assets)
- Manual `workflow_dispatch`

Jobs:
1. `check` — installs deps, runs `tsc --noEmit`
2. `build-android` (non-PR) — prebuild + gradle assembleRelease, uploads APK artifact

### Optional: EAS Build (for managed cloud builds)
1. Install EAS CLI: `npm install -g eas-cli`
2. Add `EXPO_TOKEN` secret to the repository
3. Swap the prebuild/gradle steps in the workflow for the commented-out EAS block

### Signing the release APK (production)
- Generate a keystore: `keytool -genkeypair -v -keystore release.keystore -alias alwaysonvpn -keyalg RSA -keysize 2048 -validity 10000`
- Store `KEYSTORE_PASSWORD`, `KEY_PASSWORD`, `KEYSTORE_ALIAS=alwaysonvpn` as GitHub secrets
- Mount keystore file or use EAS credentials

## Project structure

```
mobile/
├── App.tsx                    # Entry point
├── app.json                   # Expo config (name, package ids)
├── package.json               # 10 prod deps total (ultra-light)
├── tsconfig.json              # Strict TS + @/* path alias
└── src/
    ├── theme/index.ts         # Brand colors, spacing, fonts
    ├── constants/
    │   ├── servers.ts         # 12 server locations
    │   └── defaultSettings.ts # Default preferences + types
    ├── context/AppContext.tsx # Global state (connection, server, settings)
    ├── navigation/AppNavigator.tsx # Bottom tabs theming
    └── screens/
        ├── HomeScreen.tsx     # Connect dashboard
        ├── LocationsScreen.tsx# Server list
        └── SettingsScreen.tsx # Preferences
```
