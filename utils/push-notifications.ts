import Constants from 'expo-constants';
import * as Device from 'expo-device';

export type PushPermissionState = 'granted' | 'denied' | 'undetermined' | 'unavailable';

type NotificationsModule = typeof import('expo-notifications');
type NotificationSubscription = {
  remove: () => void;
};

function isExpoGo() {
  return Constants.appOwnership === 'expo';
}

async function loadNotifications(): Promise<NotificationsModule | null> {
  if (isExpoGo()) {
    return null;
  }

  return import('expo-notifications');
}

export async function getPushPermissionState(): Promise<PushPermissionState> {
  if (!Device.isDevice) {
    return 'unavailable';
  }

  const Notifications = await loadNotifications();

  if (!Notifications) {
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

  const Notifications = await loadNotifications();

  if (!Notifications) {
    return 'unavailable';
  }

  const permissions = await Notifications.requestPermissionsAsync();

  if (permissions.granted) {
    return 'granted';
  }

  return permissions.status === Notifications.PermissionStatus.DENIED ? 'denied' : 'undetermined';
}

export async function requestPushPermissionWithConsent(): Promise<PushPermissionState> {
  return requestPushPermission();
}

export async function getExpoPushToken(projectId?: string): Promise<string | null> {
  if ((await getPushPermissionState()) !== 'granted') {
    return null;
  }

  const Notifications = await loadNotifications();

  if (!Notifications) {
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);

  return token.data;
}

export async function getAuthenticatedExpoPushToken(projectId?: string): Promise<string | null> {
  return getExpoPushToken(projectId);
}

export function configureNotificationHandling() {
  void loadNotifications().then((Notifications) => {
    Notifications?.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  });
}

export function addNotificationLifecycleListeners() {
  let isDisposed = false;
  let receivedSubscription: NotificationSubscription | null = null;
  let responseSubscription: NotificationSubscription | null = null;

  void loadNotifications().then((Notifications) => {
    if (!Notifications || isDisposed) {
      return;
    }

    receivedSubscription = Notifications.addNotificationReceivedListener(() => {});
    responseSubscription = Notifications.addNotificationResponseReceivedListener(() => {});
  });

  return () => {
    isDisposed = true;
    receivedSubscription?.remove();
    responseSubscription?.remove();
  };
}
