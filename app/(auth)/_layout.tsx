import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryText,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Iniciar sesión', headerBackVisible: false }} />
      <Stack.Screen name="login-error" options={{ title: 'Iniciar sesión' }} />
      <Stack.Screen name="recover" options={{ title: 'Recuperar contraseña' }} />
    </Stack>
  );
}
