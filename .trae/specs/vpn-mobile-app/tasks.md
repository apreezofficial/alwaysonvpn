# AlwaysOnVPN Mobile App - Implementation Plan

## Task 1: Scaffold Expo Project (Minimal Config)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Create a new Expo (SDK 52 stable) TypeScript project inside `mobile/` directory at the repo root (sibling to existing `app/`, `components/`).
  - Use a minimal template: blank TypeScript, no Expo Router extras unless it's the default.
  - Install only these production extras: navigation (react-navigation/native + bottom-tabs + native-stack, or Expo Router minimal), icon library (`@expo/vector-icons` for Lucide or `lucide-react-native`), and a tiny state helper if needed (not Zustand unless unavoidable — prefer React Context).
  - Configure `app.json` with app name "AlwaysOnVPN", slug "alwaysonvpn-mobile", package name `com.alwaysonvpn.mobile`, dark background splash color matching brand.
  - Configure `tsconfig.json` with strict mode ON.
  - Add npm scripts: `start`, `android`, `ios`, `ts:check` (runs `tsc --noEmit`), `build:android:local` (expo prebuild + gradlew assembleRelease or equivalent documented command).
- **Acceptance Criteria Addressed**: AC-1, AC-7
- **Test Requirements**:
  - `rule` TR-1.1: After `npm install` inside `mobile/`, running `npm run ts:check` exits with code 0. Evidence: terminal exit code + summary line.
  - `rule` TR-1.2: `package.json` "dependencies" object has ≤ 8 entries total (including Expo core entries from template). Evidence: screenshot of `cat package.json` dependencies block.
  - `rubric` TR-1.3: Scaffold cleanliness — minimal boilerplate, no unused template files (default assets, demo screens). Scale 1-5; 1 = messy template leftovers; 3 = some leftovers; 5 = only required files. Threshold >= 4. Evidence: `ls -la mobile/` listing.
- **Notes**: Create `mobile/` folder explicitly; do not pollute the repo root with mobile files.

## Task 2: Implement Global Theme, Constants, and State Context
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `mobile/src/theme/index.ts`: brand colors matching landing page — background `#07080c` / surface `#0c0e14`, primary white `#ffffff`, emerald-400 status color, red-400 error color, grays for text hierarchy (`gray-400`, `gray-300`, `gray-200`); typography constants: monospace font stack for status labels, system sans for body, size scale tokens.
  - Create `mobile/src/constants/servers.ts`: list of 12+ server locations — `{ id, city, country, flagEmoji, pingMs, loadPercent }` — distributed across continents (Tokyo, Singapore, Sydney, LA, NY, London, Frankfurt, Paris, Bangalore, Toronto, São Paulo, Johannesburg).
  - Create `mobile/src/context/AppContext.tsx`: React Context providing `{ isConnected, connecting, selectedServer, settings, setSelectedServer, toggleConnection, updateSetting }`. No persistence required (in-memory only per spec AC-4 "in-session"). Simulate 350-700ms connecting delay on toggle.
  - Create `mobile/src/constants/defaultSettings.ts`: `{ alwaysOn: false, autoReconnect: true, killSwitch: false, protocol: 'wireguard' as 'wireguard' | 'openvpn-udp' | 'openvpn-tcp', theme: 'dark' as 'dark' | 'system' }`.
- **Acceptance Criteria Addressed**: AC-3, AC-4, AC-6
- **Test Requirements**:
  - `rule` TR-2.1: Servers list contains >= 12 entries, each with all required fields non-empty. Evidence: `grep -c id src/constants/servers.ts` count or import check output.
  - `rule` TR-2.2: AppContext provides all 4 actions (setSelectedServer, toggleConnection, updateSetting) and state shape matches types defined. Evidence: TypeScript `tsc --noEmit` passes with strict types.
  - `rubric` TR-2.3: Color palette vs landing page PhoneMockup match accuracy. Scale 1-5; 1 = totally different hex values; 3 = some shared colors; 5 = exact hex for bg/surface/status indicators. Threshold >= 4. Evidence: side-by-side screenshot with hex callouts.

## Task 3: Implement Bottom Tab Navigator and Screen Shell
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - Set up Bottom Tab Navigator with three tabs: Home (Shield icon), Locations (Globe icon), Settings (Settings icon).
  - Each tab label matches and icon comes from Lucide set. Active tab color = white, inactive = gray-400. Background = `#0c0e14` with subtle top border.
  - Wrap app in `AppContext.Provider` at root.
  - Create placeholder stub components for each screen (just title + brand header) to verify navigation works before filling in details.
- **Acceptance Criteria Addressed**: FR-4, AC-6
- **Test Requirements**:
  - `rule` TR-3.1: Tapping each bottom tab navigates to the correct screen with the correct title visible. Evidence: 3 screenshots one per tab.
  - `rule` TR-3.2: TypeScript compiles with no errors after adding navigation. Evidence: `npm run ts:check` exit 0.

## Task 4: Implement Home/Connect Screen
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - Full visual fidelity to `PhoneMockup.tsx` from the landing page.
  - Top app header bar: shield icon + "AlwaysOnVPN" text + "ALWAYS-ON" pill badge (matches PhoneMockup).
  - Status section: uppercase monospace label ("TUNNEL DISARMED" / "RE-HANDSHAKING..." / "VPN TUNNEL LOCKED"), status dot (red/emerald pulsing), large "Exposed"/"Protected"/"Connecting..." text.
  - Large circular Shield button in center (w-32 h-32 equivalent in RN). Spinning animation when `connecting`. Toggle calls `toggleConnection()` from context.
  - Gateway details card: Globe + Gateway name (selectedServer), Server + Virtual IP ("194.26.29.112" when connected / "Unmasked Origin" when not), Lock + Cipher "ChaCha20-Poly1305".
  - Throughput 2-column card: DOWN / UP with fluctuating MB/s values. When connected, randomize values every 1.5-2s via setInterval (38-50 MB/s down range, 8-14 MB/s up).
  - Optional (to match PhoneMockup): handover simulation button at the bottom — "Simulate Wi-Fi → 5G Switch" — with 1.2s spinning animation then "Handover Passed (0.00ms Leak)" confirmation for 3.5s.
- **Acceptance Criteria Addressed**: FR-1, FR-6, AC-2, AC-6
- **Test Requirements**:
  - `rule` TR-4.1: Initial state shows Disconnected/Exposed. Tap shield → Connecting label + spin appears for 400-700ms → Connected/Protected state with green dot and details. Evidence: 3-screenshot sequence or video clip.
  - `rule` TR-4.2: When connected, throughput numbers visibly change at least twice within 5 seconds. Evidence: 2 timestamped screenshots with differing down/up values.
  - `rubric` TR-4.3: Layout match to PhoneMockup.tsx (spacings, card structure, type scale). Scale 1-5; 1 = different layout; 3 = similar but wrong spacing; 5 = pixel-level match of structure and proportions. Threshold >= 4. Evidence: overlay comparison screenshot.

## Task 5: Implement Server Location List Screen
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - Title header "Server Locations".
  - Subtitle "Tap a location to connect" in gray.
  - Flat list of all 12 servers from constants. Each row:
    - Left: flag emoji (large) + city name + country name
    - Middle: ping ms (monospace, green if < 60, yellow 60-150, red > 150)
    - Right: load indicator bar (small 40x4 bar, filled % = loadPercent) OR text "32%" + checkmark icon if currently selected.
  - Selected row: background highlight white/5% + checkmark on right.
  - Tap row → `setSelectedServer(server)` context call.
  - Optional: top-of-list "Fastest Available" pseudo-row that auto-picks lowest ping.
  - Scroll performance: use FlatList with `getItemLayout` if needed to ensure smooth 60fps.
- **Acceptance Criteria Addressed**: FR-2, AC-3, AC-6
- **Test Requirements**:
  - `rule` TR-5.1: All 12+ server rows visible in scrollable list with correct emoji/city/country. Evidence: full scroll screenshot collage or 2 screenshots showing top and bottom of list.
  - `rule` TR-5.2: After tapping row X, navigating to Home tab shows row X's city name in the Gateway details card. Evidence: Locations tab (tap) → Home screenshot pair.
  - `rule` TR-5.3: Selected row visually different from unselected rows (highlight + checkmark). Evidence: close-up screenshot of selected + unselected adjacent rows.

## Task 6: Implement Settings Screen
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - Title header "Settings".
  - Grouped list sections with section titles in monospace uppercase small gray:
    1. "CONNECTION" — Always-On toggle, Auto-Reconnect toggle, Kill Switch toggle.
    2. "PROTOCOL" — three-option selector: WireGuard (default), OpenVPN UDP, OpenVPN TCP. Use segmented control or three pressable cards.
    3. "APPEARANCE" — theme selector: Dark, System. Two options.
  - Each toggle row: left label, right Switch component (iOS style on both platforms for brand consistency).
  - All changes call `updateSetting(key, value)` from context.
  - Footer version line at bottom: "AlwaysOnVPN Mobile v1.0.0 · Build 20261005" in tiny gray monospace.
- **Acceptance Criteria Addressed**: FR-3, AC-4, AC-6
- **Test Requirements**:
  - `rule` TR-6.1: All 3 toggles + protocol selector + theme selector change state visually on tap. Evidence: before/after screenshot per control.
  - `rule` TR-6.2: After modifying settings, navigate to Home and back to Settings — same values persist. Evidence: screenshots of round-trip.
  - `rubric` TR-6.3: Settings layout polish and group consistency. Scale 1-5; 1 = unaligned messy controls; 3 = functional but plain; 5 = consistent spacings, card group styling matches Home cards visual language. Threshold >= 4. Evidence: full Settings screenshot.

## Task 7: Create GitHub Actions Build Workflow
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - Create `.github/workflows/mobile-build.yml`.
  - Trigger on: push to `main` or `master` paths under `mobile/**`; tags `v*`.
  - Jobs:
    1. `check`: runs-on ubuntu-latest — checkout, setup node 20, npm ci in `mobile/`, run `npm run ts:check`.
    2. `build-android`: needs check, runs-on ubuntu-latest, same setup steps.
       - Install Java 17 (required for Android builds).
       - Run Expo prebuild if needed OR use documented local build approach.
       - Build Android release APK (assembleRelease).
       - Use `actions/upload-artifact@v4` to upload `app-release.apk` with name "alwaysonvpn-android-${{ github.sha }}".
  - Include comments for user-configurable secrets: `EXPO_TOKEN` (if they later switch to EAS Build), Android keystore setup instructions.
  - Document build commands in `mobile/README.md` (one file only — no extra docs) — how to run dev server, how to build locally, what the workflow does.
- **Acceptance Criteria Addressed**: AC-5, NFR-2
- **Test Requirements**:
  - `rule` TR-7.1: Workflow YAML is syntactically valid. Evidence: `yamllint` (if available) or GitHub `actions/workflow-validator` CLI or python yaml.safe_load runs without exception.
  - `rule` TR-7.2: Workflow contains jobs named `check` and `build-android`, with `ts:check` step and `upload-artifact` step referencing an APK path. Evidence: grep or YAML parse output.
  - `rubric` TR-7.3: Workflow conciseness and caching. Scale 1-5; 1 = no cache, many wasteful steps; 3 = baseline cache; 5 = uses npm cache + gradle cache appropriately, minimal steps. Threshold >= 3. Evidence: workflow file review.

## Task 8: Final Verification — tsc, App Build Smoke Test
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 4, 5, 6, 7
- **Description**:
  - Run `npm run ts:check` in `mobile/` from clean install.
  - Run `npm install` from scratch to ensure no transient dep issues.
  - Start Expo dev server and confirm app loads in Expo Go / iOS simulator / Android emulator (at least one platform).
  - Walk through: Home toggle connect, Locations select server, Settings change all controls, navigate all screens — verify no runtime errors.
  - Record findings and attach as completion evidence.
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-6, AC-7
- **Test Requirements**:
  - `rule` TR-8.1: Clean `npm install` in `mobile/` exits 0, `npm run ts:check` exits 0. Evidence: full terminal output with exit codes.
  - `rule` TR-8.2: Expo dev server starts (`npx expo start`) and outputs a QR code without fatal errors. Evidence: terminal screenshot after 10s of running.
  - `rubric` TR-8.3: Overall app quality and polish. Scale 1-5; 1 = broken interactions; 3 = works but visibly prototype quality; 5 = smooth interactions, no visible glitches, production-feeling demo. Threshold >= 4. Evidence: recorded screen walkthrough or annotated screenshots.
