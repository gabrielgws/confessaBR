import { Pressable, Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import type { Notification } from '@/types/notifications';

const kindLabels: Record<Notification['kind'], string> = {
  message: 'Mensagem',
  poll_invite: 'Enquete',
  poll_result: 'Resultado',
  payment: 'Pagamento',
};

export function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (notificationId: string) => void;
}) {
  return (
    <Card className="gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <Badge
          label={kindLabels[notification.kind]}
          variant={notification.readState === 'read' ? 'neutral' : 'success'}
        />
        <Text className="text-xs text-zinc-500 dark:text-zinc-400">
          {new Date(notification.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
        {notification.title}
      </Text>
      <Text className="text-sm leading-5 text-zinc-600 dark:text-zinc-300">
        {notification.body}
      </Text>
      {notification.readState === 'unread' ? (
        <Pressable
          accessibilityRole="button"
          className="self-start rounded-lg py-2 active:bg-zinc-100 dark:active:bg-zinc-800"
          onPress={() => onMarkRead(notification.id)}>
          <Text className="text-sm font-semibold text-teal-700 dark:text-teal-300">
            Marcar como lida
          </Text>
        </Pressable>
      ) : null}
    </Card>
  );
}
