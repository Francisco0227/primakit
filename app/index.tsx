import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '@/constants/theme';
import { useSession } from '@/context/SessionContext';

/** M0 Arranque: decides between login and the kit list once the stored session is checked. */
export default function SplashScreen() {
  const { session } = useSession();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Placeholder for reading the stored Firebase Auth session.
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (ready) return <Redirect href={session ? '/kits' : '/login'} />;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PrimaKit</Text>
      <Text style={styles.subtitle}>Botiquines · Más Bosque Manu A.C.</Text>
      <ActivityIndicator color={colors.primaryText} style={styles.spinner} />
      <Text style={styles.hint}>Verificando sesión y datos guardados en el teléfono...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 40, fontWeight: '800', color: colors.primaryText },
  subtitle: { fontSize: 14, color: '#CFE3DA', marginTop: 4 },
  spinner: { marginTop: 32 },
  hint: { marginTop: 12, fontSize: 13, color: '#CFE3DA', textAlign: 'center' },
});
