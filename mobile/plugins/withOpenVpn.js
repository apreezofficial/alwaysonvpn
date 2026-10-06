// Expo config plugin that wires react-native-simple-openvpn into the generated
// Android project (the manual steps from the library README):
//   1. include the ':vpnLib' Gradle module (ics-openvpn Java sources)
//   2. extract native libs to disk on install (useLegacyPackaging)
//   3. copy the prebuilt OpenVPN .so files into app/src/main/jniLibs
const fs = require('fs');
const path = require('path');
const { withSettingsGradle, withGradleProperties, withDangerousMod } = require('expo/config-plugins');

const VPNLIB_SNIPPET = [
  '// @generated withOpenVpn',
  "include ':vpnLib'",
  "project(':vpnLib').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-simple-openvpn/vpnLib')",
].join('\n');

function withVpnLibModule(config) {
  return withSettingsGradle(config, (c) => {
    if (!c.modResults.contents.includes("':vpnLib'")) {
      c.modResults.contents += `\n${VPNLIB_SNIPPET}\n`;
    }
    return c;
  });
}

function setProperty(props, key, value) {
  const existing = props.find((p) => p.type === 'property' && p.key === key);
  if (existing) existing.value = value;
  else props.push({ type: 'property', key, value });
}

function withVpnGradleProperties(config) {
  return withGradleProperties(config, (c) => {
    // ics-openvpn execs libovpnexec.so from the extracted native lib dir.
    setProperty(c.modResults, 'expo.useLegacyPackaging', 'true');
    // vpnLib is an older module: it declares BuildConfig fields and targets Java 8.
    setProperty(c.modResults, 'android.defaults.buildfeatures.buildconfig', 'true');
    setProperty(c.modResults, 'kotlin.jvm.target.validation.mode', 'warning');
    return c;
  });
}

function withJniLibs(config) {
  return withDangerousMod(config, [
    'android',
    (c) => {
      const source = path.join(c.modRequest.projectRoot, 'native', 'jniLibs');
      const dest = path.join(c.modRequest.platformProjectRoot, 'app', 'src', 'main', 'jniLibs');
      if (!fs.existsSync(source) || fs.readdirSync(source).length === 0) {
        throw new Error(
          '[withOpenVpn] OpenVPN native libraries are missing. Run `npm run fetch:ovpn` in mobile/ before prebuild.',
        );
      }
      fs.cpSync(source, dest, { recursive: true });
      return c;
    },
  ]);
}

module.exports = function withOpenVpn(config) {
  return withJniLibs(withVpnGradleProperties(withVpnLibModule(config)));
};
