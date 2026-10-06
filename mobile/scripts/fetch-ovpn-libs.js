#!/usr/bin/env node
// Downloads the prebuilt OpenVPN native libraries (ics-openvpn) used by
// react-native-simple-openvpn. They are too large for npm, so the upstream
// project publishes them as GitHub release assets.
//
// Usage: node scripts/fetch-ovpn-libs.js [abi ...]   (default: armeabi-v7a arm64-v8a)
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const RELEASE = 'https://github.com/ccnnde/react-native-simple-openvpn/releases/download/v2.0.0';
const ALL_ABIS = ['armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'];
const OUT_DIR = path.join(__dirname, '..', 'native', 'jniLibs');

function unzip(zipFile, dest) {
  fs.mkdirSync(dest, { recursive: true });
  try {
    execFileSync('unzip', ['-o', '-q', zipFile, '-d', dest], { stdio: 'inherit' });
  } catch {
    // Windows 10+ ships bsdtar, which can extract zip archives.
    execFileSync('tar', ['-xf', zipFile, '-C', dest], { stdio: 'inherit' });
  }
}

async function fetchAbi(abi) {
  const dest = path.join(OUT_DIR, abi);
  if (fs.existsSync(path.join(dest, 'libopenvpn.so'))) {
    console.log(`[ovpn] ${abi}: already present`);
    return;
  }
  const url = `${RELEASE}/${abi}.zip`;
  console.log(`[ovpn] ${abi}: downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed for ${abi}: HTTP ${res.status}`);
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'ovpn-')), `${abi}.zip`);
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  unzip(tmp, dest);
  if (!fs.existsSync(path.join(dest, 'libopenvpn.so'))) {
    throw new Error(`${abi}: archive did not contain libopenvpn.so`);
  }
  console.log(`[ovpn] ${abi}: done`);
}

async function main() {
  const abis = process.argv.slice(2);
  const wanted = abis.length > 0 ? abis : ['armeabi-v7a', 'arm64-v8a'];
  for (const abi of wanted) {
    if (!ALL_ABIS.includes(abi)) throw new Error(`Unknown ABI "${abi}". Use one of: ${ALL_ABIS.join(', ')}`);
    await fetchAbi(abi);
  }
}

main().catch((e) => {
  console.error(`[ovpn] ${e.message}`);
  process.exit(1);
});
