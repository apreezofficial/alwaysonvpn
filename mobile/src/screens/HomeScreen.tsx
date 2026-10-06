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
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Shield, Globe, Server, Lock, MapPin, AlertTriangle } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { colors, spacing, radius, font, fontSize } from '../theme';

function AppHeader({ protocolLabel }: { protocolLabel: string }) {
  return (
    <View style={styles.appHeader}>
      <View style={styles.appHeaderLogo}>
        <View style={styles.logoBadge}>
          <Shield size={14} color={colors.text} strokeWidth={1.8} />
        </View>
        <Text style={styles.appHeaderTitle}>AlwaysOnVPN</Text>
      </View>
      <View style={styles.alwaysOnPill}>
        <Text style={styles.alwaysOnPillText}>{protocolLabel}</Text>
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

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {
    status,
    isConnected,
    statusMessage,
    error,
    connectedAt,
    activeServer,
    selectedServer,
    serversLoading,
    toggleConnection,
  } = useApp();
  const [now, setNow] = useState(Date.now());
  const shieldSpin = useRef(new Animated.Value(0)).current;

  const busy = status === 'connecting' || status === 'disconnecting';
  const server = activeServer ?? selectedServer;

  useEffect(() => {
    if (!busy) {
      shieldSpin.stopAnimation();
      shieldSpin.setValue(0);
      return;
    }
    shieldSpin.setValue(0);
    const anim = Animated.loop(
      Animated.timing(shieldSpin, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [busy, shieldSpin]);

  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [isConnected]);

  const shieldRotate = shieldSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const statusLabel =
    status === 'connecting'
      ? statusMessage || 'Connecting'
      : status === 'disconnecting'
      ? 'Closing tunnel'
      : isConnected
      ? 'VPN tunnel active'
      : 'Tunnel off';
  const statusWord =
    status === 'connecting'
      ? 'Connecting...'
      : status === 'disconnecting'
      ? 'Disconnecting...'
      : isConnected
      ? 'Protected'
      : 'Not protected';
  const statusColor = busy ? colors.warning : isConnected ? colors.success : colors.danger;

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
        <AppHeader protocolLabel={server ? `OPENVPN ${server.proto.toUpperCase()}` : 'OPENVPN'} />

        <View style={styles.content}>
          <View style={styles.statusSection}>
            <Text style={styles.statusLabel} numberOfLines={1}>
              {statusLabel}
            </Text>
            <View style={styles.statusRow}>
              <PulsingDot color={statusColor} />
              <Text style={[styles.statusWord, { color: colors.text }]}>{statusWord}</Text>
            </View>
          </View>

          <View style={styles.shieldWrap}>
            <Pressable
              onPress={toggleConnection}
              disabled={status === 'disconnecting'}
              accessibilityLabel={isConnected || busy ? 'Disconnect VPN' : 'Connect VPN'}
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
                <Animated.View style={{ transform: [{ rotate: shieldRotate }] }}>
                  <Shield size={48} strokeWidth={1.8} color={isConnected ? '#000' : colors.text} />
                </Animated.View>
                <Text style={[styles.shieldSubText, { color: isConnected ? '#000' : colors.text }]}>
                  {status === 'connecting' ? 'TAP TO CANCEL' : isConnected ? 'TAP TO STOP' : busy ? '...' : 'TAP TO CONNECT'}
                </Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.gatewayCard}>
            <View style={styles.gatewayRow}>
              <View style={styles.gatewayLabelWrap}>
                <Globe size={14} color={colors.textMuted} strokeWidth={1.8} />
                <Text style={styles.gatewayLabel}>Location</Text>
              </View>
              <Text style={styles.gatewayValue} numberOfLines={1}>
                {server
                  ? `${server.flagEmoji} ${server.country}`
                  : serversLoading
                  ? 'Loading servers...'
                  : isConnected
                  ? 'Active tunnel'
                  : 'No server'}
              </Text>
            </View>
            <View style={styles.gatewayDivider} />
            <View style={styles.gatewayRow}>
              <View style={styles.gatewayLabelWrap}>
                <Server size={14} color={colors.textMuted} strokeWidth={1.8} />
                <Text style={styles.gatewayLabel}>{isConnected ? 'Exit IP' : 'Server IP'}</Text>
              </View>
              <Text style={[styles.gatewayValue, styles.gatewayMono]}>{server ? server.ip : '—'}</Text>
            </View>
            <View style={styles.gatewayDivider} />
            <View style={styles.gatewayRow}>
              <View style={styles.gatewayLabelWrap}>
                <Lock size={14} color={colors.textMuted} strokeWidth={1.8} />
                <Text style={styles.gatewayLabel}>Transport</Text>
              </View>
              <Text style={[styles.gatewayValue, styles.gatewayMono, styles.gatewaySmall]}>
                {server ? `${server.proto.toUpperCase()} :${server.port}` : '—'}
              </Text>
            </View>
          </View>

          {isConnected && (
            <View style={styles.throughputRow}>
              <View style={styles.throughputCell}>
                <Text style={styles.throughputKey}>UPTIME</Text>
                <Text style={styles.throughputValue}>
                  {connectedAt ? formatDuration(now - connectedAt) : '--:--:--'}
                </Text>
              </View>
              <View style={styles.throughputCell}>
                <Text style={styles.throughputKey}>SERVER SPEED</Text>
                <Text style={styles.throughputValue}>{server ? `${server.speedMbps} Mbps` : '—'}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          {error && (
            <View style={styles.errorRow}>
              <AlertTriangle size={12} color={colors.danger} strokeWidth={2} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <View style={styles.footerDivider} />
          <Pressable
            onPress={() => navigation.navigate('Locations')}
            accessibilityLabel="Change VPN location"
            accessibilityRole="button"
            style={({ pressed }) => [styles.handoverBtn, pressed && { opacity: 0.85 }]}
          >
            <MapPin size={14} color={colors.text} strokeWidth={1.8} />
            <Text style={styles.handoverText}>Change Location</Text>
          </Pressable>
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
  alwaysOnPillText: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '600',
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
  errorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: spacing.md,
  },
  errorText: {
    flex: 1,
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.danger,
    lineHeight: 15,
  },
});
