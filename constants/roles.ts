import type { Role } from '@/types';

export const roleLabels: Record<Role, string> = {
  voluntario: 'Voluntario',
  paramedico: 'Paramédico',
  administrador: 'Administrador',
};

/** Roles that may register restocks (Security Rules enforce this on the server). */
export const canRestock = (role: Role) => role !== 'voluntario';
