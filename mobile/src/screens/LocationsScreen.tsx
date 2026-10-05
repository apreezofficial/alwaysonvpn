import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Zap } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { servers, ServerLocation } from '../constants/servers';
import { colors, spacing, radius, font, fontSize } from '../theme';

function pingColor(ms: number): string {
  if (ms < 60) return colors.success;
  if (ms < 150) return colors.warning;
  return colors.danger;
}

interface Props {
  server: ServerLocation;
  selected: boolean;
  onPress: () => void;
}

function ServerRow({ server, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Select ${server.city} server`}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={styles.rowLeft}>
        <Text style={styles.flag}>{server.flagEmoji}</Text>
        <View style={{ marginLeft: spacing.md }}>
          <Text style={styles.city}>{server.city}</Text>
          <Text style={styles.country}>{server.country}</Text>
        </View>
      </View>
      <View style={styles.rowCenter}>
        <Text style={[styles.ping, { color: pingColor(server.pingMs) }]}>
          {server.pingMs} ms
        </Text>
      </View>
      <View style={styles.rowRight}>
        {selected ? (
          <View style={styles.selectedBadge}>
            <Check size={12} color={colors.text} strokeWidth={2.4} />
            <Text style={styles.loadSelected}>{server.loadPercent}%</Text>
          </View>
        ) : (
          <View style={styles.loadWrap}>
            <View style={styles.loadBarBg}>
              <View
                style={[
                  styles.loadBarFill,
                  {
                    width: `${server.loadPercent}%`,
                    backgroundColor:
                      server.loadPercent > 70
                        ? colors.warning
                        : server.loadPercent > 40
                        ? colors.info
                        : colors.success,
                  },
                ]}
              />
            </View>
            <Text style={styles.loadText}>{server.loadPercent}%</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function LocationsScreen() {
  const { selectedServer, setSelectedServer } = useApp();

  const fastest = [...servers].sort((a, b) => a.pingMs - b.pingMs)[0];

  const renderItem: ListRenderItem<ServerLocation> = ({ item }) => (
    <ServerRow
      server={item}
      selected={selectedServer.id === item.id}
      onPress={() => setSelectedServer(item)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Server Locations</Text>
          <Text style={styles.subtitle}>Tap a location to connect</Text>
        </View>

        <Pressable
          onPress={() => fastest && setSelectedServer(fastest)}
          style={({ pressed }) => [
            styles.fastestCard,
            selectedServer.id === fastest?.id && styles.rowSelected,
            pressed && { opacity: 0.9 },
          ]}
          accessibilityLabel="Select fastest available server"
          accessibilityRole="button"
        >
          <View style={styles.fastestLeft}>
            <View style={styles.zapBadge}>
              <Zap size={14} color={colors.warning} fill={colors.warning} strokeWidth={1.5} />
            </View>
            <View style={{ marginLeft: spacing.md }}>
              <Text style={styles.city}>Fastest Available</Text>
              <Text style={styles.country}>
                Auto · {fastest?.city} · {fastest?.pingMs} ms
              </Text>
            </View>
          </View>
          {selectedServer.id === fastest?.id && (
            <View style={[styles.selectedBadge, { paddingRight: 8 }]}>
              <Check size={12} color={colors.text} strokeWidth={2.4} />
            </View>
          )}
        </Pressable>

        <FlatList
          data={servers}
          keyExtractor={(s) => s.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: spacing.xl }}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          showsVerticalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: 68 + spacing.sm,
            offset: index * (68 + spacing.sm),
            index,
          })}
        />
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
});
