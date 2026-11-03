import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

/** Simple table-like row: label on the left, value on the right. */
export function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.highlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { fontSize: 15, color: colors.text, flex: 1 },
  value: { fontSize: 15, color: colors.muted },
  highlight: { color: colors.danger, fontWeight: '700' },
});
