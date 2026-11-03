import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Notice } from '@/components/Notice';
import { QuantityStepper } from '@/components/QuantityStepper';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { colors, spacing } from '@/constants/theme';
import { useKit } from '@/hooks/useKit';

const reasons = ['Accidente', 'Reemplazo dañado', 'Caducado', 'Otro'];

/** M5 Tomar insumos. Invalid input goes to M5e; valid input goes to M11. */
export default function TakeScreen() {
  const { id, items } = useKit();
  const [itemId, setItemId] = useState(items[0].id);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState(reasons[0]);
  const [frap, setFrap] = useState('');

  const item = items.find((i) => i.id === itemId) ?? items[0];

  const save = () => {
    const frapMissing = reason === 'Accidente' && frap.trim() === '';
    const tooMany = quantity > item.current;
    if (frapMissing || tooMany) {
      router.push({
        pathname: '/kit/[id]/take-error',
        params: { id, item: item.name, quantity, available: item.current, frapMissing: frapMissing ? '1' : '0' },
      });
      return;
    }
    router.replace({ pathname: '/saved', params: { kitId: id } });
  };

  return (
    <Screen>
      <Text style={styles.label}>Insumo</Text>
      <View style={styles.chips}>
        {items.map((i) => (
          <Chip key={i.id} label={i.name} selected={i.id === itemId} onPress={() => setItemId(i.id)} />
        ))}
      </View>
      <Text style={styles.label}>Cantidad (disponible: {item.current})</Text>
      <QuantityStepper value={quantity} onChange={setQuantity} min={1} />
      <Text style={styles.label}>Motivo</Text>
      <View style={styles.chips}>
        {reasons.map((r) => (
          <Chip key={r} label={r} selected={r === reason} onPress={() => setReason(r)} />
        ))}
      </View>
      <TextField label="Folio FRAP (obligatorio en accidente)" value={frap} onChangeText={setFrap} placeholder="FRAP 2026-0412" autoCapitalize="characters" />
      <Button title="Guardar" onPress={save} />
      <Notice>Funciona sin señal: se sube solo al recuperar conexión.</Notice>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
