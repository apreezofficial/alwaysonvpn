import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ExternalLink } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import {
  defaultSettings,
  Protocol,
  protocolLabels,
} from '../constants/defaultSettings';
import { colors, spacing, radius, font, fontSize } from '../theme';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  a11y: string;
}

function ToggleRow({ label, value, onChange, a11y }: ToggleRowProps) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityLabel={a11y}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.surfaceMed }]}
    >
      <Text style={styles.rowLabel}>{label}</Text>
      <View pointerEvents="none" collapsable={false}>
        <Switch
          value={value}
          trackColor={{ false: colors.surfaceHigh, true: colors.text }}
          thumbColor={Platform.OS === 'ios' ? undefined : value ? '#000' : colors.textDim}
          ios_backgroundColor={colors.surfaceHigh}
        />
      </View>
    </Pressable>
  );
}

interface OptionGroupProps<T extends string> {
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (v: T) => void;
  a11yPrefix: string;
}

function OptionGroup<T extends string>({ options, labels, value, onChange, a11yPrefix }: OptionGroupProps<T>) {
  return (
    <View style={styles.optionGroup}>
      {options.map((opt, idx) => {
        const selected = opt === value;
        const first = idx === 0;
        const last = idx === options.length - 1;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            accessibilityLabel={`${a11yPrefix}: ${labels[opt]}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            style={({ pressed }) => [
              styles.optionRow,
              !first && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
              first && {
                borderTopLeftRadius: radius.md,
                borderTopRightRadius: radius.md,
              },
              last && {
                borderBottomLeftRadius: radius.md,
                borderBottomRightRadius: radius.md,
              },
              selected && { backgroundColor: colors.surfaceHigh },
              pressed && !selected && { backgroundColor: colors.surfaceMed },
            ]}
          >
            <Text style={[styles.optionLabel, selected && { color: colors.text, fontWeight: '600' }]}>
              {labels[opt]}
            </Text>
            {selected ? (
              <View style={styles.optionCheck}>
                <Check size={12} color={colors.text} strokeWidth={2.4} />
              </View>
            ) : (
              <View style={styles.optionEmpty} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <Text style={styles.sectionHeader}>{title}</Text>
  );
}

function openSystemVpnSettings() {
  if (Platform.OS === 'android') {
    Linking.sendIntent('android.settings.VPN_SETTINGS').catch(() => Linking.openSettings());
  } else {
    void Linking.openSettings();
  }
}

export default function SettingsScreen() {
  const { settings, updateSetting } = useApp();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing['3xl'] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: spacing.xs, paddingBottom: spacing.md }}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <SectionHeader title="CONNECTION" />
        <View style={styles.card}>
          <ToggleRow
            label="Auto-Reconnect"
            value={settings.autoReconnect}
            onChange={(v) => updateSetting('autoReconnect', v)}
            a11y="Toggle automatic failover to another server"
          />
          <View style={styles.divider} />
          <Pressable
            onPress={openSystemVpnSettings}
            accessibilityLabel="Open Android VPN settings for Always-On and Kill Switch"
            accessibilityRole="button"
            style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.surfaceMed }]}
          >
            <View style={{ flex: 1, paddingRight: spacing.md }}>
              <Text style={styles.rowLabel}>Always-On & Kill Switch</Text>
              <Text style={styles.rowHint}>
                Set in Android VPN settings: tap the gear next to AlwaysOnVPN, then enable "Always-on VPN" and
                "Block connections without VPN".
              </Text>
            </View>
            <ExternalLink size={16} color={colors.textMuted} strokeWidth={1.8} />
          </Pressable>
        </View>

        <SectionHeader title="PROTOCOL" />
        <OptionGroup<Protocol>
          options={(['any', 'udp', 'tcp'] as const)}
          labels={protocolLabels}
          value={settings.protocol}
          onChange={(v) => updateSetting('protocol', v)}
          a11yPrefix="VPN Protocol"
        />

        <Pressable
          onPress={() => {
            updateSetting('autoReconnect', defaultSettings.autoReconnect);
            updateSetting('protocol', defaultSettings.protocol);
          }}
          accessibilityLabel="Reset all settings to defaults"
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.resetBtn,
            pressed && { backgroundColor: colors.surfaceHigh, borderColor: colors.borderStrong },
          ]}
        >
          <Text style={styles.resetText}>Reset to Defaults</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerLine}>AlwaysOnVPN Mobile v1.0.0</Text>
          <Text style={[styles.footerLine, { marginTop: spacing.xs, textAlign: 'center' }]}>
            Servers by VPN Gate (vpngate.net), run by volunteers.{'\n'}Server operators can see your traffic.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.xs,
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    letterSpacing: 1.2,
    color: colors.textDim,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  card: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowHint: {
    marginTop: 2,
    fontSize: fontSize.sm,
    color: colors.textDim,
    lineHeight: 15,
  },
  rowLabel: {
    fontSize: fontSize.base,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.lg,
  },
  optionGroup: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  optionRow: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLabel: {
    fontSize: fontSize.base,
    color: colors.textMuted,
  },
  optionCheck: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionEmpty: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: StyleSheet.hairlineWidth + 0.5,
    borderColor: colors.borderStrong,
  },
  resetBtn: {
    marginTop: spacing['2xl'],
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMed,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    fontFamily: font.mono,
    fontSize: fontSize.sm,
    color: colors.danger,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  footer: {
    marginTop: spacing['3xl'],
    alignItems: 'center',
  },
  footerLine: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textFaint,
    letterSpacing: 0.3,
  },
});
