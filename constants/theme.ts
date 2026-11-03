import type { KitStatus } from '@/types';

export const colors = {
  primary: '#1B4D3E',
  primaryText: '#FFFFFF',
  background: '#F4F7F5',
  card: '#FFFFFF',
  text: '#1C2B24',
  muted: '#66756E',
  border: '#D6DFDA',
  danger: '#C0392B',
  dangerBg: '#FDECEA',
  warning: '#B26A00',
  warningBg: '#FFF4DB',
  success: '#2E7D32',
  successBg: '#E6F4EA',
  neutral: '#6B7780',
  neutralBg: '#ECEFF1',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const statusStyle: Record<KitStatus, { label: string; color: string; bg: string }> = {
  completo: { label: 'Completo', color: colors.success, bg: colors.successBg },
  bajo: { label: 'Bajo', color: colors.warning, bg: colors.warningBg },
  critico: { label: 'Crítico', color: colors.danger, bg: colors.dangerBg },
  sin_revisar: { label: 'Sin revisar', color: colors.neutral, bg: colors.neutralBg },
};
