import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Row } from '@/components/Row';
import { Screen } from '@/components/Screen';
import { roleLabels } from '@/constants/roles';
import { useSession } from '@/context/SessionContext';

/** Menú > Cerrar sesión (the design keeps it in the overflow menu next to Mi historial). */
export default function AccountScreen() {
  const { session, signOut } = useSession();

  return (
    <Screen>
      <Row label="Correo" value={session?.email ?? ''} />
      <Row label="Rol" value={session ? roleLabels[session.role] : ''} />
      <Button title="Sincronización" variant="secondary" onPress={() => router.push('/sync')} />
      <Button
        title="Cerrar sesión"
        variant="danger"
        onPress={() => {
          signOut();
          router.replace('/login');
        }}
      />
    </Screen>
  );
}
