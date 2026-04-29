import type { Href } from 'expo-router';

import { useAuthStore } from '@/store/auth.store';

const visitorAllowedRoutes = new Set(['/login', '/register', '/']);

export function isVisitorAllowedRoute(pathname: string): boolean {
  return visitorAllowedRoutes.has(pathname);
}

export function getAuthRedirect(pathname: string): Href | null {
  const status = useAuthStore.getState().status;

  if (status === 'authenticated') {
    return null;
  }

  if (status === 'visitor' && isVisitorAllowedRoute(pathname)) {
    return null;
  }

  return '/';
}

export function getVisitorRestrictionMessage() {
  return (
    useAuthStore.getState().visitorSession?.restrictionReason ??
    'Entre ou crie uma conta para acessar esta area.'
  );
}
