# AlwaysOnVPN Mobile App - Product Requirements Document

## Overview
- **Summary**: A cross-platform VPN mobile app built with Expo (React Native), featuring three core screens — Home/Connect, Server Location List, and Settings. Ultra-lightweight, fast-launching, and deployable via GitHub Actions for both Android and iOS builds.
- **Purpose**: Deliver a production-skeleton native mobile companion app that mirrors the AlwaysOnVPN landing page brand identity, with enough UI polish and screen flow to be demoable and extendable for real VPN SDK integration later.
- **Target Users**: End-users of AlwaysOnVPN on iOS and Android; internal dev team for demo and future integration.

## Goals
- Ship a minimal-yet-polished Expo-based mobile app with three core screens.
- Match the existing landing page visual identity (dark theme, monochrome accents, monospace status labels, shield iconography).
- Keep the dependency footprint small — no heavy state libraries, no bloated navigation extras.
- Include a GitHub Actions workflow that can build and upload Android APK artifacts on push and release tags.
- App cold-launch should feel snappy: minimal splash time, no frame drops on tap interactions.

## Non-Goals
- Actual VPN tunnel functionality or backend integration (UI/skeleton only).
- In-app purchases, subscription flows, or payment screens.
- Account creation / authentication screens.
- Connection logs, split tunneling, kill switch advanced config.
- iOS App Store or Google Play signing and publishing (only build artifacts).

## Background & Context
- The repository at `c:\Users\HP\Desktop\ap\vpn` currently hosts a Next.js landing page for AlwaysOnVPN. The landing page features a `PhoneMockup.tsx` component showing the desired visual language: dark background (#07080c / #08090c), white / emerald-400 / red-400 status colors, Lucide icons (Shield, Globe, Server, Lock, Wifi, Signal), monospace for technical labels, and a large circular Shield connect button.
- User explicitly chose: React Native / Expo stack, Core Screens Only, "ultra light deployable via github actions so light weight and fast".

## Functional Requirements
- **FR-1**: Home/Connect screen — displays current VPN status (Connected / Disconnected / Connecting), a large tappable Shield button, selected gateway details (city, virtual IP, cipher), and simulated up/down throughput counters when connected.
- **FR-2**: Server Location screen — scrollable list of 10+ global VPN server locations with country flag emoji, city name, ping ms, and load indicator. Tap to select, returns to Home with new selection.
- **FR-3**: Settings screen — grouped toggle list for Always-On, Auto-Reconnect, Kill Switch, Protocol (WireGuard / OpenVPN UDP / OpenVPN TCP), plus theme selection (Dark / System default).
- **FR-4**: Bottom Tab Navigation with three tabs: Home, Locations, Settings — with icons and labels.
- **FR-5**: In-memory state: selected server, connection status, and all settings preference values persist across screen visits during a single app session.
- **FR-6**: Connect button interactions: tapping the shield animates the state change (Disconnected → Connecting (spinning) → Connected, with status label updates).

## Non-Functional Requirements
- **NFR-1**: Dependency footprint — `package.json` total production dependencies excluding Expo core should be ≤ 5 libraries. Use Expo Router or React Navigation minimal setup.
- **NFR-2**: Build speed — Android EAS/local build on a clean cache should complete in under 8 minutes on GitHub Actions ubuntu-latest.
- **NFR-3**: Launch time — Simulated app launch (Expo Go dev client) should render the Home screen first paint within 1.5s.
- **NFR-4**: Visual fidelity — Color palette, typography hierarchy, and iconography must match the existing landing page `PhoneMockup.tsx` component within 95% accuracy.
- **NFR-5**: Accessibility — All interactive buttons/toggles have accessible labels; minimum 44x44pt touch targets on iOS.

## Constraints
- **Technical**: Expo SDK (latest stable) with bare-minimum config. No TypeScript strict mode relaxations. State management via React Context or Zustand only if needed; plain React state + `AsyncStorage` (or Expo Secure Store minimal) is acceptable.
- **Business**: App must not include any licensed/trademarked assets. All icons from `@expo/vector-icons` or `lucide-react-native`.
- **Dependencies**: Node 18+; npm or yarn acceptable (npm preferred for GitHub Actions cache simplicity).

## Assumptions
- The VPN functionality itself will be added in a later phase via a native module or SDK; the current app is a UI/demo shell.
- GitHub Actions secrets are configured by the user later (e.g., `EXPO_TOKEN` for EAS Build) — the workflow file provides placeholders with comments.
- App icon and splash screen assets will use simple placeholder SVGs matching the brand, not custom illustrations.

## Open Questions
- [ ] Is there a preferred Expo Router v3 file-based navigation, or classic React Navigation (native-stack + bottom-tabs)?
- [ ] Should settings persist across app restarts using `AsyncStorage`, or only in-memory for this phase?

## Acceptance Criteria

### AC-1: Project Scaffolds and Builds
- **Type**: `rule`
- **Given**: A clean checkout of the repository with Node 20 installed
- **When**: Running `npm install` followed by `npm run build:android` (or the equivalent Expo local build command)
- **Then**: All dependencies install without errors, the TypeScript compiler reports zero errors, and the Android build artifact (APK or AAB) is produced
- **Pass Condition**: `npx tsc --noEmit` exits 0 AND the build command produces a non-zero-size artifact file
- **Evidence**: Terminal output of commands; generated APK/AAB file listing

### AC-2: Home Connect Screen Behavior
- **Type**: `rule`
- **Given**: App launched and user is on the Home tab
- **When**: The large Shield button is tapped
- **Then**: Status transitions Disconnected → Connecting (shield spins) → Connected within 1.2s; status label text updates accordingly; virtual IP and throughput counters appear
- **Pass Condition**: Three distinct states observable with correct label text and color coding
- **Evidence**: Video/screenshot sequence or Expo Go manual QA record

### AC-3: Server Location Selection
- **Type**: `rule`
- **Given**: User navigates to the Locations tab showing 10+ servers
- **When**: A server row is tapped
- **Then**: That server is marked selected (checkmark/highlight), and navigating back to Home shows the new gateway name and city in the details card
- **Pass Condition**: Selected server state reflects on Home screen without manual reload
- **Evidence**: Screenshot of Locations + Home screen before/after selection

### AC-4: Settings Persist In-Session
- **Type**: `rule`
- **Given**: User is on Settings screen with toggles and Protocol picker
- **When**: User toggles Always-On ON, changes Protocol to OpenVPN UDP, then navigates to Home and back to Settings
- **Then**: All changed values are still in their new state
- **Pass Condition**: Toggle positions and picker value match the modified state
- **Evidence**: Screenshot pair before/after round-trip navigation

### AC-5: GitHub Actions Workflow
- **Type**: `rule`
- **Given**: The `.github/workflows` directory contains the mobile app workflow file
- **When**: A push is made to `main` or a tag `v*` is created
- **Then**: The workflow runs, installs dependencies, executes `tsc --noEmit`, runs build, and uploads the Android artifact (APK)
- **Pass Condition**: Workflow YAML parses valid AND includes all three steps: tsc, build, artifact upload
- **Evidence**: Workflow file content + dry-run validation via `act` or GitHub UI preview

### AC-6: Visual Brand Match
- **Type**: `rubric`
- **Dimension**: How closely the mobile app visual identity matches the AlwaysOnVPN landing page PhoneMockup component (colors, layout, iconography, typography)
- **Scale**: 1-5
- **Anchors**: 1 = completely different style; 3 = some shared colors but different layout/icons; 5 = pixel-perfect match of palette, icons, monospace labels, card structures
- **Pass Threshold**: >= 4
- **Evidence**: Side-by-side screenshot of landing page PhoneMockup vs mobile app Home screen with annotation

### AC-7: App Footprint and Startup
- **Type**: `rubric`
- **Dimension**: Lightweightedness — dependency count, node_modules size after install, and perceived launch snappiness
- **Scale**: 1-5
- **Anchors**: 1 = heavy (15+ extra deps, slow launch); 3 = reasonable industry average; 5 = minimal deps (< 5 extras), instant-feeling launch
- **Pass Threshold**: >= 4
- **Evidence**: `npm ls --depth=0` output list count + Expo Go launch timing observation
