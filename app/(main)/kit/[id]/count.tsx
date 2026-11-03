import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { QuantityStepper } from '@/components/QuantityStepper';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { colors } from '@/constants/theme';
import { useKit } from '@/hooks/useKit';

/** M4 Conteo físico. The draft lives in local state only; nothing is written until M4b confirms. */
export default function CountScreen() {
  const { id, items } = useKit();
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((i) => [i.id, i.current])),
  );
  const [note, setNote] = useState('');

  const finish = () =>
    router.push({ pathname: '/kit/[id]/count-summary', params: { id, counts: JSON.stringify(counts), note } });

  return (
    <Screen>
      <Text style={styles.hint}>Cuenta lo que hay dentro y ajusta la cantidad.</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.itemText}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.expected}>Esperado: {item.expected}</Text>
          </View>
          <QuantityStepper value={counts[item.id]} onChange={(v) => setCounts((c) => ({ ...c, [item.id]: v }))} />
        </View>
      ))}
      <Button
        title="Marcar caducado o dañado"
        variant="secondary"
        onPress={() => Alert.alert('Caducado o dañado', 'Pendiente: marcar insumos desde esta pantalla.')}
      />
      <TextField label="Nota (opcional)" value={note} onChangeText={setNote} placeholder="Ej. caja mojada" />
      <Button title="Finalizar conteo" onPress={finish} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hint: { color: colors.muted, fontSize: 15 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 12 },
  itemText: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  expected: { fontSize: 13, color: colors.muted },
});
