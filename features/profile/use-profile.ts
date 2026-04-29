import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { normalizeApiError } from '@/services/api';
import * as authService from '@/services/auth.service';
import * as profileService from '@/services/profile.service';
import { queryClient, queryKeys } from '@/services/query-client';
import { useAuthStore } from '@/store/auth.store';
import type {
  UpdateNotificationPreferencesRequest,
  UpdatePrivacyRequest,
  UpdateProfileRequest,
} from '@/types/auth';
import type { User } from '@/types/user';

export function useProfile() {
  const storedUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const profileQuery = useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.getCurrentUser,
    enabled: Boolean(token),
  });
  const user = profileQuery.data ?? storedUser;

  useEffect(() => {
    if (profileQuery.data && profileQuery.data !== storedUser) {
      setUser(profileQuery.data);
    }
  }, [profileQuery.data, setUser, storedUser]);

  const profileMutation = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: ({ user: updatedUser }) => updateUser(updatedUser),
  });

  const privacyMutation = useMutation({
    mutationFn: profileService.updatePrivacy,
    onSuccess: (privacySettings) => {
      if (user) {
        updateUser({ ...user, privacySettings });
      }
    },
  });

  const notificationMutation = useMutation({
    mutationFn: profileService.updateNotificationPreferences,
    onSuccess: (notificationSettings) => {
      if (user) {
        updateUser({ ...user, notificationSettings });
      }
    },
  });

  function updateUser(updatedUser: User) {
    setUser(updatedUser);
    queryClient.setQueryData(queryKeys.me, updatedUser);
  }

  return {
    user,
    updateProfile: (payload: UpdateProfileRequest) => profileMutation.mutateAsync(payload),
    updatePrivacy: (payload: UpdatePrivacyRequest) => privacyMutation.mutateAsync(payload),
    updateNotificationPreferences: (payload: UpdateNotificationPreferencesRequest) =>
      notificationMutation.mutateAsync(payload),
    profileState: {
      isPending: profileMutation.isPending,
      error: profileMutation.error ? normalizeApiError(profileMutation.error) : null,
      isSuccess: profileMutation.isSuccess,
    },
    privacyState: {
      isPending: privacyMutation.isPending,
      error: privacyMutation.error ? normalizeApiError(privacyMutation.error) : null,
      isSuccess: privacyMutation.isSuccess,
    },
    notificationState: {
      isPending: notificationMutation.isPending,
      error: notificationMutation.error ? normalizeApiError(notificationMutation.error) : null,
      isSuccess: notificationMutation.isSuccess,
    },
  };
}
