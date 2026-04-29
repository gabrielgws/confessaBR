import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';

import * as authService from '@/services/auth.service';
import { normalizeApiError } from '@/services/api';
import { queryClient, queryKeys } from '@/services/query-client';
import { useAuthStore } from '@/store/auth.store';
import type { LoginRequest, RegisterRequest } from '@/types/auth';

export function useAuthSession() {
  const { status, token, user, visitorSession, setSession, setUser, clearSession, enterVisitorMode } =
    useAuthStore();

  const meQuery = useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.getCurrentUser,
    enabled: Boolean(token),
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (session) => {
      await setSession(session.token, session.user);
      queryClient.setQueryData(queryKeys.me, session.user);
      router.replace('/(tabs)/home');
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: async (session) => {
      await setSession(session.token, session.user);
      queryClient.setQueryData(queryKeys.me, session.user);
      router.replace('/(tabs)/home');
    },
  });

  async function signOut() {
    try {
      await authService.logout();
    } finally {
      await clearSession();
      queryClient.clear();
      router.replace('/');
    }
  }

  function visit() {
    enterVisitorMode();
    router.replace('/');
  }

  useEffect(() => {
    if (meQuery.data && meQuery.data !== user) {
      setUser(meQuery.data);
    }
  }, [meQuery.data, setUser, user]);

  return {
    status,
    token,
    user: meQuery.data ?? user,
    visitorSession,
    isAuthenticated: status === 'authenticated',
    isVisitor: status === 'visitor',
    login: (payload: LoginRequest) => loginMutation.mutateAsync(payload),
    register: (payload: RegisterRequest) => registerMutation.mutateAsync(payload),
    signOut,
    visit,
    loginState: {
      isPending: loginMutation.isPending,
      error: loginMutation.error ? normalizeApiError(loginMutation.error) : null,
      isSuccess: loginMutation.isSuccess,
    },
    registerState: {
      isPending: registerMutation.isPending,
      error: registerMutation.error ? normalizeApiError(registerMutation.error) : null,
      isSuccess: registerMutation.isSuccess,
    },
    bootstrapState: {
      isPending: meQuery.isPending && Boolean(token),
      error: meQuery.error ? normalizeApiError(meQuery.error) : null,
    },
  };
}
