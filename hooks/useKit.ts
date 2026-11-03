import { useLocalSearchParams } from 'expo-router';
import { getKit, getKitItems } from '@/data/kits';

/** Reads the `id` route param and returns the matching kit and its items. */
export function useKit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return { id, kit: getKit(id), items: getKitItems(id) };
}
