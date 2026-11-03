import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { Notice } from '@/components/Notice';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { colors } from '@/constants/theme';

/** M1b Recuperar contraseña. Will call Firebase Auth sendPasswordResetEmail. */
export default function RecoverScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Screen>
      <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
      <Text style={styles.subtitle}>Te enviaremos un enlace a tu correo para crear una nueva.</Text>
      <TextField label="Correo" value={email} onChangeText={setEmail} placeholder="nombre@correo.com" autoCapitalize="none" keyboardType="email-address" />
      <Button title="Enviar enlace" onPress={() => setSent(true)} />
      {sent ? <Notice tone="info">Si el correo existe, recibirás un enlace en unos minutos.</Notice> : null}
      <Button title="Volver a iniciar sesión" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: 15, color: colors.muted },
});
