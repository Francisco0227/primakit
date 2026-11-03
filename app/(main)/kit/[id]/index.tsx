import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Row } from '@/components/Row';
import { Screen } from '@/components/Screen';
import { StatusBadge } from '@/components/StatusBadge';
import { SyncPill } from '@/components/SyncPill';
import { canRestock } from '@/constants/roles';
import { colors } from '@/constants/theme';
import { useSession } from '@/context/SessionContext';
import { useKit } from '@/hooks/useKit';

/** M3 Detalle del botiquín. */
export default function KitDetailScreen() {
  const { id, kit, items } = useKit();
  const { session } = useSession();

  if (!kit) return <Notice tone="error">Botiquín no encontrado.</Notice>;

  const low = items.filter((i) => i.current < i.min).length;

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>
          {kit.id} {kit.name}
        </Text>
        <SyncPill />
      </View>
      <StatusBadge status={kit.status} />
      {low > 0 ? <Text style={styles.muted}>{low} insumos bajo el mínimo</Text> : null}
      <Row label="Última revisión" value={kit.lastCheck ? `${kit.lastCheck} · ${kit.lastCheckBy}` : 'Nunca'} />
      <Row label="Ubicación" value={kit.location} />

      <Text style={styles.section}>Contenido (actual / mín.)</Text>
      {items.map((i) => (
        <Row key={i.id} label={i.name} value={`${i.current} / ${i.min}`} highlight={i.current < i.min} />
      ))}

      <Button title="Iniciar conteo" onPress={() => router.push(`/kit/${id}/count`)} />
      <Button title="Tomar insumos" variant="secondary" onPress={() => router.push(`/kit/${id}/take`)} />
      {session && canRestock(session.role) ? (
        <Button title="Reponer" variant="secondary" onPress={() => router.push(`/kit/${id}/restock`)} />
      ) : null}
      <Button title="Reportar problema" variant="secondary" onPress={() => router.push({ pathname: '/report', params: { kitId: id } })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: colors.primary },
  muted: { color: colors.muted },
  section: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 8 },
});
