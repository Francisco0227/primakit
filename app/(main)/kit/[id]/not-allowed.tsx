import { StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Row } from '@/components/Row';
import { Screen } from '@/components/Screen';
import { roleLabels } from '@/constants/roles';
import { colors } from '@/constants/theme';
import { useSession } from '@/context/SessionContext';

/** M6e Acción no permitida: the server rejected the action because of the user's role. */
export default function NotAllowedScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useSession();

  return (
    <Screen>
      <Text style={styles.title}>Tu rol no permite registrar reposiciones</Text>
      <Row label="Rol actual" value={session ? roleLabels[session.role] : '-'} />
      <Notice>Si crees que es un error, pide al administrador que revise tu rol.</Notice>
      <Notice tone="warning">Si tu rol cambió mientras estabas sin señal, el registro fue rechazado y se avisó al administrador.</Notice>
      <Button title="Volver al botiquín" onPress={() => router.replace(`/kit/${id}`)} />
      <Button title="Reportar al administrador" variant="secondary" onPress={() => router.replace({ pathname: '/report', params: { kitId: id } })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', color: colors.danger },
});
