import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { colors, spacing } from '@/constants/theme';
import { getKit, kits } from '@/data/kits';

const types = ['Acceso sospechoso', 'Botiquín dañado', 'Otro'];

/** M7 Reportar problema. Will write to /reports; a Cloud Function creates the alert. */
export default function ReportScreen() {
  const { kitId } = useLocalSearchParams<{ kitId?: string }>();
  const [type, setType] = useState(types[0]);
  const [selectedKit, setSelectedKit] = useState(getKit(kitId ?? '')?.id ?? kits[0].id);
  const [description, setDescription] = useState('');

  return (
    <Screen>
      <Text style={styles.label}>Tipo de problema</Text>
      <View style={styles.chips}>
        {types.map((t) => (
          <Chip key={t} label={t} selected={t === type} onPress={() => setType(t)} />
        ))}
      </View>
      <Text style={styles.label}>Botiquín</Text>
      <View style={styles.chips}>
        {kits.map((k) => (
          <Chip key={k.id} label={`${k.id} · ${k.name}`} selected={k.id === selectedKit} onPress={() => setSelectedKit(k.id)} />
        ))}
      </View>
      <TextField label="Descripción" value={description} onChangeText={setDescription} placeholder="El candado estaba abierto y faltan gasas" multiline style={styles.multiline} />
      <Button title="Enviar reporte" onPress={() => router.replace({ pathname: '/saved', params: { kitId: selectedKit } })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  multiline: { minHeight: 100, textAlignVertical: 'top', paddingTop: 12 },
});
