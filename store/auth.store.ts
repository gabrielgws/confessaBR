import { create } from 'zustand';

import type { User, VisitorSession } from '@/types/user';
import { clearAuthToken, getAuthToken, setAuthToken } from '@/utils/secure-token';

type AuthStatus = 'idle' | 'bootstrapping' | 'authenticated' | 'visitor' | 'anonymous';

type AuthState = {
  status: AuthStatus;
  token: string | null;
  user: User | null;
  visitorSession: VisitorSession | null;
  bootstrap: () => Promise<void>;
  setSession: (token: string, user: User) => Promise<void>;
  setUser: (user: User | null) => void;
  enterVisitorMode: () => void;
  clearSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  token: null,
  user: null,
  visitorSession: null,
  bootstrap: async () => {
    set({ status: 'bootstrapping' });
    const token = await getAuthToken();

    set({
      token,
      status: token ? 'authenticated' : 'anonymous',
    });
  },
  setSession: async (token, user) => {
    await setAuthToken(token);
    set({
      status: 'authenticated',
      token,
      user,
      visitorSession: null,
    });
  },
  setUser: (user) => set({ user }),
  enterVisitorMode: () =>
    set({
      status: 'visitor',
      token: null,
      user: null,
      visitorSession: {
        sessionId: `visitor-${Date.now()}`,
        startedAt: new Date().toISOString(),
        allowedSurfaces: ['landing', 'login', 'register'],
        restrictionReason: 'Visitors can only access landing and authentication screens.',
      },
    }),
  clearSession: async () => {
    await clearAuthToken();
    set({
      status: 'anonymous',
      token: null,
      user: null,
      visitorSession: null,
    });
  },
}));
