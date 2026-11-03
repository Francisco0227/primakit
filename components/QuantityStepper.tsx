import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

/** Large - / + buttons so it stays usable with gloves on. */
export function QuantityStepper({ value, onChange, min = 0 }: Props) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityLabel="Restar" style={styles.btn} onPress={() => onChange(Math.max(min, value - 1))}>
        <Text style={styles.btnText}>-</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable accessibilityLabel="Sumar" style={styles.btn} onPress={() => onChange(value + 1)}>
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  btn: { width: 48, height: 48, borderRadius: 10, backgroundColor: colors.neutralBg, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 26, color: colors.primary, fontWeight: '600' },
  value: { minWidth: 32, textAlign: 'center', fontSize: 20, fontWeight: '700', color: colors.text },
});
