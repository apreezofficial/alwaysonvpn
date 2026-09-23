# AlwaysOnVPN (常時接続) 🛡️⚡

> **"You must have used other VPNs. But this, this... is different."**  
> *It's always on. Your real location never slips.*

[![Android](https://img.shields.io/badge/Platform-Android_8.0+-3DDC84?style=flat&logo=android&logoColor=white)](https://android.com)
[![Protocol](https://img.shields.io/badge/Protocol-WireGuard_Native-88171A?style=flat)](https://wireguard.com)
[![Cipher](https://img.shields.io/badge/Cipher-ChaCha20--Poly1305-00F0FF?style=flat)]()
[![Footprint](https://img.shields.io/badge/APK_Size-6.4MB-00E699?style=flat)]()
[![Status](https://img.shields.io/badge/Release-Launching_in_2_Days-FF2A5F?style=flat)]()

AlwaysOnVPN is an ultra-fast, featherweight, persistent Android VPN designed to provide continuous, zero-leak network encryption across all cellular and Wi-Fi transitions.

---

## 🌟 Key Highlights

- **常時接続 (Always-On Engine)**: Binds directly to the native Android `VpnService` with an unkillable foreground watchdog daemon.
- **不可視 (Zero Location Slips)**: Eliminates microsecond IP/DNS leaks during network handovers.
- **羽毛 (6.4 MB Featherweight APK)**: Written in native Rust with zero analytics, tracking, or adware bloat.
- **省電力 (Sub-1% Daily Battery Impact)**: Uses asynchronous epoll event loops that never hold aggressive CPU wakelocks.
- **影 (Shadow Stealth Mode)**: Disguises WireGuard packets as standard HTTPS TLS 1.3 traffic to defeat strict firewalls.
- **沈黙 (100% RAM-Only Gateways)**: All gateway servers operate on volatile memory with zero disk logging.

---

## 🚀 Live Landing Page Features

- **EarthNetCanvas**: Procedural 60fps Earth & global internet web visualizer linked directly to user scroll.
- **Live 2-Day Launch Countdown**: Interactive countdown ticker down to the millisecond.
- **Interactive Android APK Simulator**: In-browser phone mockup allowing users to simulate Wi-Fi to 5G handovers and verify 0.00ms packet leakage.
- **VIP Early Access Reservation**: Device-specific waitlist with instant VIP token dispatch and confetti celebration.

---

## 💻 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: HTML5 Canvas 3D Projection & Canvas Confetti
- **Language**: TypeScript

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/apreezofficial/alwaysonvpn.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📜 License

MIT © AlwaysOnVPN Team. 「絶対の自由と、揺るぎない接続を」
