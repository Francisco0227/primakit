export type Role = 'voluntario' | 'paramedico' | 'administrador';

export type KitStatus = 'completo' | 'bajo' | 'critico' | 'sin_revisar';

export interface Kit {
  id: string;
  name: string;
  status: KitStatus;
  summary: string;
  lastCheck?: string;
  lastCheckBy?: string;
  location: string;
}

export interface KitItem {
  id: string;
  name: string;
  current: number;
  expected: number;
  min: number;
}

export interface HistoryEntry {
  id: string;
  date: string;
  action: string;
  kitId: string;
  type: 'uso' | 'conteo' | 'reposicion' | 'reporte';
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  kind: 'revision' | 'sync' | 'admin';
  target: string;
}
