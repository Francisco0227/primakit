import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Role } from '@/types';

interface Session {
  email: string;
  role: Role;
}

interface SessionContextValue {
  session: Session | null;
  signIn: (email: string) => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

// Placeholder for Firebase Auth: the role is faked from the e-mail so every flow can be demoed.
const roleFromEmail = (email: string): Role =>
  email.includes('voluntario') ? 'voluntario' : email.includes('admin') ? 'administrador' : 'paramedico';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      signIn: (email) => setSession({ email, role: roleFromEmail(email.toLowerCase()) }),
      signOut: () => setSession(null),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside <SessionProvider>');
  return ctx;
}
