import { StyleSheet, Text } from 'react-native';
import { Linking } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { colors } from '@/constants/theme';

/** M1e Error de inicio de sesión. */
export default function LoginErrorScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();

  return (
    <Screen>
      <Text style={styles.title}>No pudimos iniciar sesión</Text>
      <Notice tone="error" title="Posibles causas">
        {'• Correo o contraseña incorrectos\n• Sin conexión (el primer inicio requiere internet)\n• Tu cuenta está desactivada'}
      </Notice>
      <TextField label="Correo" value={email ?? ''} editable={false} error=" " />
      <TextField label="Contraseña" value="••••••••" editable={false} error=" " />
      <Button title="Reintentar" onPress={() => router.back()} />
      <Button title="Contactar al administrador" variant="secondary" onPress={() => Linking.openURL('mailto:admin@masbosquemanu.org')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', color: colors.danger },
});
