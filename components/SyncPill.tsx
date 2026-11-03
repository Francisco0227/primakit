import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/theme';

/** Sync indicator; taps through to the Sincronización screen (M9). */
export function SyncPill({ online = true }: { online?: boolean }) {
  return (
    <Pressable onPress={() => router.push('/sync')} style={[styles.pill, !online && styles.offline]}>
      <Text style={[styles.text, !online && styles.textOffline]}>{online ? 'Sincronizado' : 'Sin señal'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: colors.successBg },
  offline: { backgroundColor: colors.warningBg },
  text: { fontSize: 12, fontWeight: '600', color: colors.success },
  textOffline: { color: colors.warning },
});
