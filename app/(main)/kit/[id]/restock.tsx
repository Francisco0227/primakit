import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Notice } from '@/components/Notice';
import { QuantityStepper } from '@/components/QuantityStepper';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { canRestock } from '@/constants/roles';
import { colors, spacing } from '@/constants/theme';
import { useSession } from '@/context/SessionContext';
import { useKit } from '@/hooks/useKit';

/** M6 Reponer insumos. A role without permission is sent to M6e (the server would reject it). */
export default function RestockScreen() {
  const { id, items } = useKit();
  const { session } = useSession();
  const [itemId, setItemId] = useState(items[0].id);
  const [quantity, setQuantity] = useState(1);
  const [expiry, setExpiry] = useState('');

  const item = items.find((i) => i.id === itemId) ?? items[0];

  const save = () => {
    if (!session || !canRestock(session.role)) {
      router.replace({ pathname: '/kit/[id]/not-allowed', params: { id } });
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
      <Text style={styles.label}>
        Cantidad a agregar (actual: {item.current} · mín: {item.min})
      </Text>
      <QuantityStepper value={quantity} onChange={setQuantity} min={1} />
      <TextField label="Fecha de caducidad" value={expiry} onChangeText={setExpiry} placeholder="MM / AAAA" />
      <Notice>Recomendado: haz un conteo después de reponer.</Notice>
      <Button title="Guardar reposición" onPress={save} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
