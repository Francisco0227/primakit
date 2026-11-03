import { StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

/** M11 Registro guardado: shared confirmation after a count, use, restock or report. */
export default function SavedScreen() {
  const { kitId } = useLocalSearchParams<{ kitId?: string }>();

  const goHome = () => {
    router.dismissAll();
    router.navigate('/kits');
  };

  const goKit = () => {
    router.dismissAll();
    router.push(kitId ? `/kit/${kitId}` : '/kits');
  };

  return (
    <Screen>
      <Text style={styles.title}>Registro guardado</Text>
      <Notice tone="warning" title="Guardado en el teléfono">
        Pendiente de sincronizar (sin señal). Se subirá solo al haber conexión.
      </Notice>
      <Notice>No desinstales la app ni borres sus datos mientras haya pendientes.</Notice>
      <Button title="Volver al botiquín" onPress={goKit} />
      <Button title="Ir al inicio" variant="secondary" onPress={goHome} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: colors.success },
});
