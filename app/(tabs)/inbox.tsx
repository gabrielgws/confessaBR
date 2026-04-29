import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Button, Card, EmptyState, ErrorState, Header, LoadingState } from '@/components/ui';
import { useInbox } from '@/features/inbox/use-inbox';

export default function InboxScreen() {
  const { messages, isLoading, error } = useInbox();

  if (isLoading) {
    return <LoadingState title="Carregando inbox" />;
  }

  if (error) {
    return <ErrorState title="Inbox indisponivel" description={error.message} />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Inbox anonimo" subtitle="Mensagens sem metadados sensiveis" />
      <View className="gap-4">
        <Link href="/(modals)/send-message" asChild>
          <Button title="Enviar anonima" />
        </Link>
        {messages.length === 0 ? (
          <EmptyState title="Nenhuma mensagem" description="Quando alguem enviar uma mensagem anonima, ela aparecera aqui." />
        ) : (
          messages.map((message) => (
            <Link key={message.id} href={{ pathname: '/(modals)/message-detail', params: { messageId: message.id } }} asChild>
              <Card className="gap-2">
                <View className="flex-row items-center justify-between gap-3">
                  <Text className="font-semibold text-zinc-950 dark:text-zinc-50">{message.senderAlias}</Text>
                  <Text className="text-xs text-zinc-500 dark:text-zinc-400">{new Date(message.createdAt).toLocaleDateString()}</Text>
                </View>
                <Text className="text-sm leading-5 text-zinc-700 dark:text-zinc-200" numberOfLines={3}>
                  {message.body}
                </Text>
              </Card>
            </Link>
          ))
        )}
      </View>
    </ScrollView>
  );
}
