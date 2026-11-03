import { Redirect, Stack } from 'expo-router';
import { colors } from '@/constants/theme';
import { useSession } from '@/context/SessionContext';

export default function MainLayout() {
  const { session } = useSession();

  // Route guard: everything under (main) needs a session.
  if (!session) return <Redirect href="/login" />;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryText,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="kit/[id]/index" options={{ title: 'Detalle del botiquín' }} />
      <Stack.Screen name="kit/[id]/count" options={{ title: 'Conteo físico' }} />
      <Stack.Screen name="kit/[id]/count-summary" options={{ title: 'Resumen del conteo' }} />
      <Stack.Screen name="kit/[id]/take" options={{ title: 'Tomar insumos' }} />
      <Stack.Screen name="kit/[id]/take-error" options={{ title: 'Error de validación' }} />
      <Stack.Screen name="kit/[id]/restock" options={{ title: 'Reponer insumos' }} />
      <Stack.Screen name="kit/[id]/not-allowed" options={{ title: 'Acción no permitida' }} />
      <Stack.Screen name="report" options={{ title: 'Reportar problema' }} />
      <Stack.Screen name="sync" options={{ title: 'Sincronización' }} />
      <Stack.Screen name="saved" options={{ title: 'Registro guardado', headerBackVisible: false }} />
    </Stack>
  );
}
