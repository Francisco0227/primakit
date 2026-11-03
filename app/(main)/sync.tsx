import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Row } from '@/components/Row';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { pendingWrites } from '@/data/history';

/** M9 Sincronización: pending offline writes. Retry is simulated until Firestore is connected. */
export default function SyncScreen() {
  const [rows, setRows] = useState(pendingWrites);
  const [lastSync, setLastSync] = useState('hoy 09:12');

  const retry = () => {
    setRows([]);
    setLastSync('ahora');
  };

  return (
    <Screen>
      <Text style={styles.title}>{rows.length === 0 ? 'Todo sincronizado' : `${rows.length} registros pendientes`}</Text>
      {rows.map((r) => (
        <Row key={r.id} label={`${r.record} · ${r.kitId}`} value={r.status} highlight={r.status === 'Error'} />
      ))}
      {rows.some((r) => r.status === 'Error') ? <Notice tone="error">1 registro no se pudo subir tras 3 intentos</Notice> : null}
      <Button title="Reintentar ahora" onPress={retry} />
      <Text style={styles.muted}>Última sincronización: {lastSync}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.primary },
  muted: { color: colors.muted, textAlign: 'center' },
});
