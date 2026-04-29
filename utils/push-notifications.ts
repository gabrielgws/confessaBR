import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export type PushPermissionState = 'granted' | 'denied' | 'undetermined' | 'unavailable';

export async function getPushPermissionState(): Promise<PushPermissionState> {
  if (!Device.isDevice) {
    return 'unavailable';
  }

  const permissions = await Notifications.getPermissionsAsync();

  if (permissions.granted) {
    return 'granted';
  }

  if (permissions.status === Notifications.PermissionStatus.DENIED) {
    return 'denied';
  }

  return 'undetermined';
}

export async function requestPushPermission(): Promise<PushPermissionState> {
  if (!Device.isDevice) {
    return 'unavailable';
  }

  const permissions = await Notifications.requestPermissionsAsync();

  if (permissions.granted) {
    return 'granted';
  }

  return permissions.status === Notifications.PermissionStatus.DENIED ? 'denied' : 'undetermined';
}

export async function getExpoPushToken(projectId?: string): Promise<string | null> {
  if ((await getPushPermissionState()) !== 'granted') {
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);

  return token.data;
}

export function configureNotificationHandling() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}
