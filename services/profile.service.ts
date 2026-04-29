import { api } from '@/services/api';
import type {
  ProfileUpdateResponse,
  UpdateNotificationPreferencesRequest,
  UpdatePrivacyRequest,
  UpdateProfileRequest,
} from '@/types/auth';
import type { NotificationSettings, PrivacySettings } from '@/types/user';

export async function updateProfile(payload: UpdateProfileRequest): Promise<ProfileUpdateResponse> {
  const response = await api.patch<ProfileUpdateResponse>('/me/profile', payload);

  return response.data;
}

export async function updatePrivacy(payload: UpdatePrivacyRequest): Promise<PrivacySettings> {
  const response = await api.patch<PrivacySettings>('/me/privacy', payload);

  return response.data;
}

export async function updateNotificationPreferences(
  payload: UpdateNotificationPreferencesRequest,
): Promise<NotificationSettings> {
  const response = await api.patch<NotificationSettings>('/me/notifications', payload);

  return response.data;
}
