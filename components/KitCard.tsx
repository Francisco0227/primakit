import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, statusStyle } from '@/constants/theme';
import type { Kit } from '@/types';

export function KitCard({ kit, onPress }: { kit: Kit; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={[styles.dot, { backgroundColor: statusStyle[kit.status].color }]} />
      <View style={styles.body}>
        <Text style={styles.title}>
          {kit.id} {kit.name}
        </Text>
        <Text style={styles.subtitle}>{kit.summary}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  dot: { width: 14, height: 14, borderRadius: 7 },
  body: { flex: 1, gap: 2 },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  subtitle: { fontSize: 13, color: colors.muted },
  chevron: { fontSize: 24, color: colors.muted },
});
