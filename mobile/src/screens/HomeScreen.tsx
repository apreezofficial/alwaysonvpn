import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Shield,
  Globe,
  Server,
  Lock,
  RefreshCw,
  CheckCircle2,
  Wifi,
  Signal,
  BatteryFull,
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { colors, spacing, radius, font, fontSize } from '../theme';

function StatusBar() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusTime}>12:00</Text>
      <View style={styles.statusNotch} />
      <View style={styles.statusIcons}>
        <Signal size={12} color={colors.text} strokeWidth={2} />
        <Wifi size={12} color={colors.text} strokeWidth={2} />
        <BatteryFull size={14} color={colors.text} strokeWidth={2} />
      </View>
    </View>
  );
}

function AppHeader({ alwaysOn }: { alwaysOn: boolean }) {
  return (
    <View style={styles.appHeader}>
      <View style={styles.appHeaderLogo}>
        <View style={styles.logoBadge}>
          <Shield size={14} color={colors.text} strokeWidth={1.8} />
        </View>
        <Text style={styles.appHeaderTitle}>AlwaysOnVPN</Text>
      </View>
      <View
        style={[
          styles.alwaysOnPill,
          alwaysOn && styles.alwaysOnPillActive,
        ]}
      >
        <Text
          style={[
            styles.alwaysOnPillText,
            alwaysOn && styles.alwaysOnPillTextActive,
          ]}
        >
          ALWAYS-ON
        </Text>
      </View>
    </View>
  );
}

function PulsingDot({ color }: { color: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.6, duration: 800, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
          Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        ]),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scale, opacity]);

  return (
    <View style={{ width: 8, height: 8, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
          transform: [{ scale }],
          opacity,
        }}
      />
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export default function HomeScreen() {
  const { isConnected, connecting, selectedServer, settings, toggleConnection } = useApp();
  const [throughputDown, setThroughputDown] = useState(42.1);
  const [throughputUp, setThroughputUp] = useState(11.4);
  const [simulatingHandover, setSimulatingHandover] = useState(false);
  const [handoverSuccess, setHandoverSuccess] = useState(false);
  const shieldSpin = useRef(new Animated.Value(0)).current;
  const handoverSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!connecting) {
      shieldSpin.stopAnimation();
      shieldSpin.setValue(0);
      return;
    }
    shieldSpin.setValue(0);
    const anim = Animated.loop(
      Animated.timing(shieldSpin, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [connecting, shieldSpin]);

  useEffect(() => {
    if (!simulatingHandover) {
      handoverSpin.stopAnimation();
      handoverSpin.setValue(0);
      return;
    }
    handoverSpin.setValue(0);
    const anim = Animated.loop(
      Animated.timing(handoverSpin, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [simulatingHandover, handoverSpin]);

  const shieldRotate = shieldSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const handoverRotate = handoverSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      setThroughputDown(parseFloat((38 + Math.random() * 12).toFixed(1)));
      setThroughputUp(parseFloat((9 + Math.random() * 5).toFixed(1)));
    }, 1700);
    return () => clearInterval(interval);
  }, [isConnected]);

  const triggerHandover = () => {
    if (simulatingHandover || !isConnected) return;
    setSimulatingHandover(true);
    setHandoverSuccess(false);
    setTimeout(() => {
      setSimulatingHandover(false);
      setHandoverSuccess(true);
      setTimeout(() => setHandoverSuccess(false), 3500);
    }, 1200);
  };

  const statusLabel = connecting
    ? 'RE-HANDSHAKING...'
    : isConnected
    ? 'VPN TUNNEL LOCKED'
    : 'TUNNEL DISARMED';
  const statusWord = connecting ? 'Connecting...' : isConnected ? 'Protected' : 'Exposed';
  const statusColor = connecting ? colors.warning : isConnected ? colors.success : colors.danger;

  const buttonBase: ViewStyle = {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.screen}>
        <StatusBar />
        <AppHeader alwaysOn={settings.alwaysOn} />

        <View style={styles.content}>
          <View style={styles.statusSection}>
            <Text style={styles.statusLabel}>{statusLabel}</Text>
            <View style={styles.statusRow}>
              <PulsingDot color={statusColor} />
              <Text style={[styles.statusWord, { color: colors.text }]}>
                {statusWord}
              </Text>
            </View>
          </View>

          <View style={styles.shieldWrap}>
            <Pressable
              onPress={toggleConnection}
              disabled={connecting}
              accessibilityLabel={isConnected ? 'Disconnect VPN' : 'Connect VPN'}
              accessibilityRole="button"
              hitSlop={16}
            >
              <View
                style={[
                  buttonBase,
                  isConnected
                    ? {
                        backgroundColor: colors.text,
                        shadowColor: colors.text,
                        shadowOpacity: 0.2,
                        shadowRadius: 16,
                        shadowOffset: { width: 0, height: 0 },
                        elevation: 8,
                      }
                    : {
                        backgroundColor: colors.surfaceMed,
                        borderWidth: StyleSheet.hairlineWidth + 1,
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                ]}
              >
                <Animated.View
                  style={{
                    transform: [{ rotate: shieldRotate }],
                  }}
                >
                  <Shield
                    size={48}
                    strokeWidth={1.8}
                    color={isConnected ? '#000' : colors.text}
                  />
                </Animated.View>
                <Text
                  style={[
                    styles.shieldSubText,
                    { color: isConnected ? '#000' : colors.text },
                  ]}
                >
                  {connecting ? 'LOCKING...' : isConnected ? 'ACTIVE' : 'TAP TO ARM'}
                </Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.gatewayCard}>
            <View style={styles.gatewayRow}>
              <View style={styles.gatewayLabelWrap}>
                <Globe size={14} color={colors.textMuted} strokeWidth={1.8} />
                <Text style={styles.gatewayLabel}>Gateway</Text>
              </View>
              <Text style={styles.gatewayValue}>
                {selectedServer.city} ({selectedServer.id.toUpperCase()})
              </Text>
            </View>
            <View style={styles.gatewayDivider} />
            <View style={styles.gatewayRow}>
              <View style={styles.gatewayLabelWrap}>
                <Server size={14} color={colors.textMuted} strokeWidth={1.8} />
                <Text style={styles.gatewayLabel}>Virtual IP</Text>
              </View>
              <Text style={[styles.gatewayValue, styles.gatewayMono]}>
                {isConnected ? '194.26.29.112' : 'Unmasked Origin'}
              </Text>
            </View>
            <View style={styles.gatewayDivider} />
            <View style={styles.gatewayRow}>
              <View style={styles.gatewayLabelWrap}>
                <Lock size={14} color={colors.textMuted} strokeWidth={1.8} />
                <Text style={styles.gatewayLabel}>Cipher</Text>
              </View>
              <Text style={[styles.gatewayValue, styles.gatewayMono, styles.gatewaySmall]}>
                ChaCha20-Poly1305
              </Text>
            </View>
          </View>

          {isConnected && (
            <View style={styles.throughputRow}>
              <View style={styles.throughputCell}>
                <Text style={styles.throughputKey}>DOWN</Text>
                <Text style={styles.throughputValue}>{throughputDown} MB/s</Text>
              </View>
              <View style={styles.throughputCell}>
                <Text style={styles.throughputKey}>UP</Text>
                <Text style={styles.throughputValue}>{throughputUp} MB/s</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Pressable
            onPress={triggerHandover}
            disabled={simulatingHandover || !isConnected}
            accessibilityLabel="Simulate Wi-Fi to 5G handover"
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.handoverBtn,
              pressed && { opacity: 0.85 },
              (!isConnected || simulatingHandover) && { opacity: 0.4 },
            ]}
          >
            <Animated.View
              style={{
                transform: [{ rotate: handoverRotate }],
              }}
            >
              <RefreshCw size={14} color={colors.text} strokeWidth={1.8} />
            </Animated.View>
            <Text style={styles.handoverText}>
              {simulatingHandover
                ? 'Switching Networks...'
                : handoverSuccess
                ? 'Handover Passed (0.00ms Leak)'
                : 'Simulate Wi-Fi → 5G Switch'}
            </Text>
          </Pressable>
          {handoverSuccess && (
            <View style={styles.handoverSuccess}>
              <CheckCircle2 size={12} color={colors.success} strokeWidth={2} />
              <Text style={styles.handoverSuccessText}>
                0 packets leaked outside tunnel.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  screen: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  statusBar: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTime: {
    fontFamily: font.mono,
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
  },
  statusNotch: {
    width: 64,
    height: 14,
    backgroundColor: '#000',
    borderRadius: 7,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appHeader: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  appHeaderLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoBadge: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMed,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeaderTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.1,
  },
  alwaysOnPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: StyleSheet.hairlineWidth + 0.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMed,
  },
  alwaysOnPillActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  alwaysOnPillText: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '600',
  },
  alwaysOnPillTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  statusSection: {
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  statusLabel: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textDim,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
  statusWord: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  shieldWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  shieldSubText: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.6,
  },
  gatewayCard: {
    marginTop: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.md,
  },
  gatewayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gatewayLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gatewayLabel: {
    fontFamily: font.mono,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  gatewayValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
  },
  gatewayMono: {
    fontFamily: font.mono,
  },
  gatewaySmall: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  gatewayDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  throughputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  throughputCell: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
  },
  throughputKey: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textDim,
  },
  throughputValue: {
    fontFamily: font.mono,
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  footer: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  footerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  handoverBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceMed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 44,
  },
  handoverText: {
    fontFamily: font.mono,
    fontSize: fontSize.sm,
    color: colors.text,
  },
  handoverSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  handoverSuccessText: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.success,
  },
});
