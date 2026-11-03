import { StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Row } from '@/components/Row';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { useKit } from '@/hooks/useKit';

/** M4b Resumen del conteo: expected vs counted, shown before the record is saved. */
export default function CountSummaryScreen() {
  const { id, items } = useKit();
  const { counts } = useLocalSearchParams<{ counts: string }>();
  const real: Record<string, number> = counts ? JSON.parse(counts) : {};

  const diffs = items
    .map((i) => ({ ...i, real: real[i.id] ?? i.current, diff: (real[i.id] ?? i.current) - i.expected }))
    .filter((i) => i.diff !== 0);
  const missing = diffs.some((d) => d.diff < 0);

  return (
    <Screen>
      <Text style={styles.title}>{diffs.length} diferencias encontradas</Text>
      {diffs.map((d) => (
        <Row key={d.id} label={`${d.name} (esp. ${d.expected}, real ${d.real})`} value={d.diff > 0 ? `+${d.diff}` : `${d.diff}`} highlight={d.diff < 0} />
      ))}
      {missing ? <Notice tone="warning">Faltantes sin uso registrado: se generará una alerta de merma no justificada.</Notice> : null}
      <Notice>Una vez confirmado, el conteo no se puede editar.</Notice>
      <Button title="Confirmar" onPress={() => router.replace({ pathname: '/saved', params: { kitId: id } })} />
      <Button title="Volver a editar" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.primary },
});
