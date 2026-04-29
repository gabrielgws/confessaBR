import { useMutation } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

import { useProfile } from '@/features/profile/use-profile';
import { normalizeApiError } from '@/services/api';
import * as notificationsService from '@/services/notifications.service';
import { queryClient, queryKeys } from '@/services/query-client';
import type { UpdateNotificationPreferencesRequest } from '@/types/auth';
import {
  getAuthenticatedExpoPushToken,
  requestPushPermissionWithConsent,
} from '@/utils/push-notifications';

function getProjectId() {
  return (
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId ??
    Constants.expoConfig?.extra?.projectId
  );
}

export function useNotifications() {
  const { user, updateNotificationPreferences, notificationState } = useProfile();

  const registerDeviceMutation = useMutation({
    mutationFn: notificationsService.registerDevice,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all }),
  });

  async function requestPermissionAndRegister() {
    const permissionState = await requestPushPermissionWithConsent();

    if (permissionState !== 'granted') {
      return { permissionState, device: null };
    }

    const token = await getAuthenticatedExpoPushToken(getProjectId());

    if (!token) {
      return { permissionState: 'unavailable' as const, device: null };
    }

    const device = await registerDeviceMutation.mutateAsync({
      expoPushToken: token,
      platform: Device.osName === 'iOS' ? 'ios' : Device.osName === 'Android' ? 'android' : 'unknown',
      deviceName: Device.deviceName,
    });

    return { permissionState, device };
  }

  return {
    preferences: user?.notificationSettings,
    updatePreferences: (payload: UpdateNotificationPreferencesRequest) =>
      updateNotificationPreferences(payload),
    requestPermissionAndRegister,
    preferenceState: notificationState,
    deviceRegistrationState: {
      isPending: registerDeviceMutation.isPending,
      error: registerDeviceMutation.error ? normalizeApiError(registerDeviceMutation.error) : null,
      isSuccess: registerDeviceMutation.isSuccess,
    },
  };
}
