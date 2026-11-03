import { StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

/** M5e Error de validación. */
export default function TakeErrorScreen() {
  const { id, item, quantity, available, frapMissing } = useLocalSearchParams<{
    id: string;
    item: string;
    quantity: string;
    available: string;
    frapMissing: string;
  }>();

  return (
    <Screen>
      <Text style={styles.title}>Revisa los campos marcados</Text>
      {frapMissing === '1' ? (
        <Notice tone="error" title="Folio FRAP">
          El folio FRAP es obligatorio cuando el motivo es Accidente.
        </Notice>
      ) : null}
      {Number(quantity) > Number(available) ? (
        <Notice tone="error" title={`Cantidad · ${item}`}>
          {`La cantidad (${quantity}) supera lo disponible (${available}). Si el stock real no coincide, haz un conteo.`}
        </Notice>
      ) : null}
      <Button title="Corregir" onPress={() => router.back()} />
      <Button title="Hacer conteo" variant="secondary" onPress={() => router.replace(`/kit/${id}/count`)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.danger },
});
