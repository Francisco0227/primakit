import type { HistoryEntry } from '@/types';

export const history: HistoryEntry[] = [
  { id: '1', date: '12 oct', action: 'Uso (2 gasas)', kitId: 'B02', type: 'uso' },
  { id: '2', date: '12 oct', action: 'Conteo', kitId: 'B02', type: 'conteo' },
  { id: '3', date: '05 oct', action: 'Reposición', kitId: 'B01', type: 'reposicion' },
  { id: '4', date: '01 oct', action: 'Reporte', kitId: 'B05', type: 'reporte' },
];

export const pendingWrites = [
  { id: 'p1', record: 'Conteo', kitId: 'B02', status: 'Pendiente' },
  { id: 'p2', record: 'Uso FRAP-0412', kitId: 'B02', status: 'Pendiente' },
  { id: 'p3', record: 'Reporte', kitId: 'B05', status: 'Error' },
];
