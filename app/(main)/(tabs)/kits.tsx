import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { KitCard } from '@/components/KitCard';
import { SyncPill } from '@/components/SyncPill';
import { colors, spacing } from '@/constants/theme';
import { kits } from '@/data/kits';
import type { KitStatus } from '@/types';

const filters: { label: string; value: KitStatus | 'todos' }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Críticos', value: 'critico' },
  { label: 'Bajos', value: 'bajo' },
  { label: 'Sin revisar', value: 'sin_revisar' },
];

/** M2 Botiquines (inicio): traffic-light status of every kit. */
export default function KitsScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<KitStatus | 'todos'>('todos');

  const visible = kits.filter(
    (k) =>
      (filter === 'todos' || k.status === filter) &&
      `${k.id} ${k.name}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <SyncPill />
      <TextInput value={query} onChangeText={setQuery} placeholder="Buscar botiquín..." placeholderTextColor={colors.muted} style={styles.search} />
      <View style={styles.filters}>
        {filters.map((f) => (
          <Chip key={f.value} label={f.label} selected={filter === f.value} onPress={() => setFilter(f.value)} />
        ))}
      </View>
      {visible.map((kit) => (
        <KitCard key={kit.id} kit={kit} onPress={() => router.push(`/kit/${kit.id}`)} />
      ))}
      <Button title="Reportar un problema" variant="secondary" onPress={() => router.push('/report')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.md },
  search: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, backgroundColor: colors.card, fontSize: 16, color: colors.text },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
