import type { Kit, KitItem } from '@/types';

// Mock data. It will be replaced by Firestore (/kits, /kitItems) in a later stage.
export const kits: Kit[] = [
  { id: 'B01', name: 'Las Planillas', status: 'completo', summary: 'Completo · revisado hace 2 días', lastCheck: '10 oct, 09:00', lastCheckBy: 'Luis', location: '20.6801, 103.5602' },
  { id: 'B02', name: 'Cerro Colli', status: 'bajo', summary: 'Bajo · 2 insumos bajo mínimo', lastCheck: '12 oct, 10:40', lastCheckBy: 'María', location: '20.6712, 103.5521' },
  { id: 'B03', name: 'Río Caliente', status: 'critico', summary: 'Caducado / faltante', lastCheck: '12 oct, 10:40', lastCheckBy: 'María', location: '20.6650, 103.5480' },
  { id: 'B04', name: 'El Pedernal', status: 'sin_revisar', summary: 'Sin revisar', location: '20.6590, 103.5390' },
  { id: 'B05', name: 'Mesa Bola', status: 'completo', summary: 'Completo · revisado ayer', lastCheck: '13 oct, 08:15', lastCheckBy: 'Juan', location: '20.6733, 103.5655' },
];

const base = [
  { id: 'gasas', name: 'Gasas 10x10', expected: 6, min: 6 },
  { id: 'vendas', name: 'Vendas elásticas', expected: 2, min: 2 },
  { id: 'guantes', name: 'Guantes (par)', expected: 8, min: 8 },
  { id: 'salina', name: 'Solución salina', expected: 2, min: 2 },
];

const currentByKit: Record<string, number[]> = {
  B02: [4, 3, 10, 1],
};

export function getKit(id: string): Kit | undefined {
  return kits.find((k) => k.id === id);
}

export function getKitItems(kitId: string): KitItem[] {
  const current = currentByKit[kitId] ?? base.map((b) => b.expected);
  return base.map((b, i) => ({ ...b, current: current[i] }));
}
