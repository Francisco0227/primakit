import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { colors } from '@/constants/theme';
import { useSession } from '@/context/SessionContext';

/** M1 Inicio de sesión. Auth is faked until Firebase Auth is wired in. */
export default function LoginScreen() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!email.includes('@') || password.length < 6) {
      router.push({ pathname: '/login-error', params: { email } });
      return;
    }
    signIn(email);
    router.replace('/kits');
  };

  return (
    <Screen>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Usa la cuenta que te envió el administrador.</Text>
      <TextField label="Correo" value={email} onChangeText={setEmail} placeholder="nombre@correo.com" autoCapitalize="none" keyboardType="email-address" />
      <TextField label="Contraseña" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
      <Button title="Iniciar sesión" onPress={submit} />
      <Text style={styles.link} onPress={() => router.push('/recover')}>
        ¿Olvidaste tu contraseña?
      </Text>
      <Text style={styles.note}>El primer inicio de sesión requiere internet.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '800', color: colors.primary },
  subtitle: { fontSize: 15, color: colors.muted },
  link: { color: colors.primary, fontWeight: '600', textAlign: 'center', padding: 8 },
  note: { color: colors.muted, fontSize: 13, textAlign: 'center' },
});
