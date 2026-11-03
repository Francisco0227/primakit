import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

interface Props {
  title?: string;
  children: string;
  tone?: 'error' | 'warning' | 'info';
}

const tones = {
  error: { bg: colors.dangerBg, color: colors.danger },
  warning: { bg: colors.warningBg, color: colors.warning },
  info: { bg: colors.neutralBg, color: colors.neutral },
};

/** Colored message box used for errors, warnings and hints. */
export function Notice({ title, children, tone = 'info' }: Props) {
  const t = tones[tone];
  return (
    <View style={[styles.box, { backgroundColor: t.bg, borderColor: t.color }]}>
      {title ? <Text style={[styles.title, { color: t.color }]}>{title}</Text> : null}
      <Text style={styles.body}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: 10, padding: 12, gap: 4 },
  title: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 14, color: colors.text },
});
