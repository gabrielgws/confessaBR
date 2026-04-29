import type { ApiActionResult } from '@/types/api';
import type {
  NotificationHistory,
  RegisterDeviceRequest,
  RegisteredDevice,
} from '@/types/notifications';

import { api } from './api';

export async function registerDevice(payload: RegisterDeviceRequest): Promise<RegisteredDevice> {
  const response = await api.post<RegisteredDevice>('/notifications/devices', payload);

  return response.data;
}

export async function removeDevice(deviceId: string): Promise<ApiActionResult> {
  const response = await api.delete<ApiActionResult>(`/notifications/devices/${deviceId}`);

  return response.data;
}

export async function getNotifications(): Promise<NotificationHistory> {
  const response = await api.get<NotificationHistory>('/notifications');

  return response.data;
}

export async function markNotificationRead(notificationId: string): Promise<ApiActionResult> {
  const response = await api.post<ApiActionResult>(`/notifications/${notificationId}/read`);

  return response.data;
}
