import { ScrollView, View } from 'react-native';

import { Button, EmptyState, ErrorState, Header, LoadingState } from '@/components/ui';
import { NotificationItem } from '@/features/notifications/notification-item';
import { useNotificationHistory } from '@/features/notifications/use-notification-history';

export default function NotificationsModal() {
  const { notifications, unreadCount, historyState, markRead } = useNotificationHistory();

  if (historyState.isLoading) {
    return <LoadingState title="Carregando notificacoes" />;
  }

  if (historyState.error) {
    return (
      <ErrorState
        title="Nao foi possivel carregar"
        description={historyState.error.message}
        action={<Button title="Tentar de novo" onPress={() => historyState.refetch()} />}
      />
    );
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header
        title="Notificacoes"
        subtitle={`${unreadCount} nao lidas`}
      />
      <View className="gap-4">
        {notifications.length === 0 ? (
          <EmptyState title="Sem notificacoes" description="Mensagens, enquetes e pagamentos aparecem aqui." />
        ) : (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onMarkRead={markRead} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
