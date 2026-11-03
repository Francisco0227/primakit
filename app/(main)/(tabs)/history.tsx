import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chip } from '@/components/Chip';
import { Notice } from '@/components/Notice';
import { Row } from '@/components/Row';
import { Screen } from '@/components/Screen';
import { spacing } from '@/constants/theme';
import { history } from '@/data/history';
import type { HistoryEntry } from '@/types';

const filters: { label: string; value: HistoryEntry['type'] | 'todo' }[] = [
  { label: 'Todo', value: 'todo' },
  { label: 'Usos', value: 'uso' },
  { label: 'Conteos', value: 'conteo' },
  { label: 'Reposiciones', value: 'reposicion' },
];

/** M8 Mi historial: read-only list of the user's own records. */
export default function HistoryScreen() {
  const [filter, setFilter] = useState<HistoryEntry['type'] | 'todo'>('todo');
  const rows = history.filter((h) => filter === 'todo' || h.type === filter);

  return (
    <Screen>
      <View style={styles.filters}>
        {filters.map((f) => (
          <Chip key={f.value} label={f.label} selected={filter === f.value} onPress={() => setFilter(f.value)} />
        ))}
      </View>
      {rows.map((h) => (
        <Row key={h.id} label={`${h.date} · ${h.action}`} value={h.kitId} />
      ))}
      {rows.length === 0 ? <Text>Sin registros.</Text> : null}
      <Notice>Los registros no se pueden editar. Para corregir, crea un registro nuevo con nota.</Notice>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
