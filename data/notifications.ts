import type { AppNotification } from '@/types';

export const notifications: AppNotification[] = [
  { id: 'n1', title: 'Revisión pendiente: B04', body: 'Han pasado 15 días desde su último conteo', kind: 'revision', target: '/kit/B04' },
  { id: 'n2', title: 'Error de sincronización', body: '1 registro no se subió', kind: 'sync', target: '/sync' },
  { id: 'n3', title: 'El administrador pide información', body: 'Sobre tu uso del 12 oct en B02', kind: 'admin', target: '/history' },
];
