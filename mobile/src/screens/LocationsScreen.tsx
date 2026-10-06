import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ListRenderItem,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Zap } from 'lucide-react-native';
import { useApp, AUTO_SERVER_ID } from '../context/AppContext';
import { VpnServer } from '../constants/servers';
import { colors, spacing, radius, font, fontSize } from '../theme';

function speedColor(mbps: number): string {
  if (mbps >= 100) return colors.success;
  if (mbps >= 30) return colors.warning;
  return colors.danger;
}

interface Props {
  server: VpnServer;
  selected: boolean;
  onPress: () => void;
}

function ServerRow({ server, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Select ${server.country} server ${server.hostName}`}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={styles.rowLeft}>
        <Text style={styles.flag}>{server.flagEmoji}</Text>
        <View style={{ marginLeft: spacing.md, flex: 1 }}>
          <Text style={styles.city} numberOfLines={1}>
            {server.country}
          </Text>
          <Text style={styles.country} numberOfLines={1}>
            {server.ip} · {server.proto.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.rowCenter}>
        <Text style={[styles.ping, { color: speedColor(server.speedMbps) }]}>
          {server.speedMbps} Mb
        </Text>
      </View>
      <View style={styles.rowRight}>
        {selected ? (
          <View style={styles.selectedBadge}>
            <Check size={12} color={colors.text} strokeWidth={2.4} />
          </View>
        ) : (
          <Text style={styles.loadText}>{server.sessions} users</Text>
        )}
      </View>
    </Pressable>
  );
}

export default function LocationsScreen() {
  const { servers, selectedId, selectServer, serversLoading, serversError, refreshServers } = useApp();

  const best = servers[0];
  const autoSelected = selectedId === AUTO_SERVER_ID;

  const renderItem: ListRenderItem<VpnServer> = ({ item }) => (
    <ServerRow
      server={item}
      selected={!autoSelected && selectedId === item.id}
      onPress={() => selectServer(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Server Locations</Text>
          <Text style={styles.subtitle}>
            {servers.length > 0
              ? `${servers.length} free VPN Gate servers · pull to refresh`
              : 'Free public servers from VPN Gate'}
          </Text>
        </View>

        <Pressable
          onPress={() => selectServer(AUTO_SERVER_ID)}
          style={({ pressed }) => [
            styles.fastestCard,
            autoSelected && styles.rowSelected,
            pressed && { opacity: 0.9 },
          ]}
          accessibilityLabel="Select best available server automatically"
          accessibilityRole="button"
        >
          <View style={styles.fastestLeft}>
            <View style={styles.zapBadge}>
              <Zap size={14} color={colors.warning} fill={colors.warning} strokeWidth={1.5} />
            </View>
            <View style={{ marginLeft: spacing.md }}>
              <Text style={styles.city}>Best Available</Text>
              <Text style={styles.country}>
                {best ? `Auto · ${best.country} · ${best.speedMbps} Mbps` : 'Auto · waiting for list'}
              </Text>
            </View>
          </View>
          {autoSelected && (
            <View style={[styles.selectedBadge, { paddingRight: 8 }]}>
              <Check size={12} color={colors.text} strokeWidth={2.4} />
            </View>
          )}
        </Pressable>

        {serversError && (
          <Pressable onPress={refreshServers} accessibilityRole="button" style={styles.errorCard}>
            <Text style={styles.errorText}>{serversError}</Text>
            <Text style={styles.retryText}>Tap to retry</Text>
          </Pressable>
        )}

        {serversLoading && servers.length === 0 ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.textMuted} />
            <Text style={styles.loadText}>Loading servers...</Text>
          </View>
        ) : (
          <FlatList
            data={servers}
            keyExtractor={(s) => s.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: spacing.xl }}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={serversLoading}
                onRefresh={refreshServers}
                tintColor={colors.textMuted}
                colors={[colors.text]}
                progressBackgroundColor={colors.surfaceElevated}
              />
            }
            getItemLayout={(_, index) => ({
              length: 68 + spacing.sm,
              offset: index * (68 + spacing.sm),
              index,
            })}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  screen: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.base,
    color: colors.textDim,
  },
  fastestCard: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMed,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  fastestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zapBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    minHeight: 68,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSelected: {
    backgroundColor: colors.surfaceHigh,
    borderColor: colors.borderStrong,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 26,
  },
  city: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.text,
  },
  country: {
    marginTop: 2,
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textDim,
  },
  rowCenter: {
    width: 60,
    alignItems: 'flex-end',
    paddingRight: spacing.md,
  },
  ping: {
    fontFamily: font.mono,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  rowRight: {
    width: 70,
    alignItems: 'flex-end',
  },
  loadWrap: {
    alignItems: 'flex-end',
  },
  loadBarBg: {
    width: 40,
    height: 4,
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  loadBarFill: {
    height: 4,
    borderRadius: radius.full,
  },
  loadText: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textDim,
    marginTop: 4,
  },
  loadSelected: {
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.text,
    marginLeft: 4,
    fontWeight: '600',
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.text,
  },
  errorCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.danger,
    backgroundColor: 'rgba(248, 113, 113, 0.08)',
  },
  errorText: {
    fontFamily: font.mono,
    fontSize: fontSize.sm,
    color: colors.danger,
  },
  retryText: {
    marginTop: spacing.xs,
    fontFamily: font.mono,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  loading: {
    paddingTop: spacing['4xl'],
    alignItems: 'center',
    gap: spacing.sm,
  },
});
