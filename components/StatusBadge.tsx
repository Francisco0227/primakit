import { StyleSheet, Text, View } from 'react-native';
import { statusStyle } from '@/constants/theme';
import type { KitStatus } from '@/types';

export function StatusBadge({ status }: { status: KitStatus }) {
  const s = statusStyle[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.color }]}>{s.label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  text: { fontSize: 12, fontWeight: '700' },
});
