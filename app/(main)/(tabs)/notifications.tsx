import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { notifications } from '@/data/notifications';

const kindColor = { revision: colors.warning, sync: colors.danger, admin: colors.primary };

/** M10 Notificaciones. Will be fed by FCM and Firestore /alerts. */
export default function NotificationsScreen() {
  return (
    <Screen>
      {notifications.map((n) => (
        <Pressable key={n.id} style={[styles.card, { borderLeftColor: kindColor[n.kind] }]} onPress={() => router.push(n.target as never)}>
          <View style={styles.body}>
            <Text style={styles.title}>{n.title}</Text>
            <Text style={styles.text}>{n.body}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, borderLeftWidth: 5, padding: 14 },
  body: { flex: 1, gap: 2 },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  text: { fontSize: 13, color: colors.muted },
  chevron: { fontSize: 24, color: colors.muted },
});
