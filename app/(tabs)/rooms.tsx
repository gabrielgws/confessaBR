import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Button, Card, EmptyState, ErrorState, Header, LoadingState } from '@/components/ui';
import { useRooms } from '@/features/rooms/use-rooms';

export default function RoomsScreen() {
  const { rooms, isLoading, error } = useRooms();

  if (isLoading) {
    return <LoadingState title="Carregando salas" />;
  }

  if (error) {
    return <ErrorState title="Salas indisponiveis" description={error.message} />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Salas" subtitle="Participe sem expor identidade no feed" />
      <View className="mb-4 flex-row gap-3">
        <Link href={'/(modals)/create-room' as Href} asChild>
          <Button title="Criar" className="flex-1" />
        </Link>
        <Link href={'/(modals)/join-room' as Href} asChild>
          <Button title="Entrar" variant="secondary" className="flex-1" />
        </Link>
      </View>
      <View className="gap-4">
        {rooms.length === 0 ? (
          <EmptyState title="Nenhuma sala" description="Crie uma sala ou entre usando um codigo." />
        ) : (
          rooms.map((room) => (
            <Link
              key={room.id}
              href={{ pathname: '/rooms/[id]', params: { id: room.id } } as unknown as Href}
              asChild>
              <Card className="gap-2">
                <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{room.name}</Text>
                <Text className="text-sm text-zinc-600 dark:text-zinc-300" numberOfLines={2}>
                  {room.description ?? 'Sala anonima do ConfessaBR'}
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  {room.memberCount} membros {room.regionLabel ? `- ${room.regionLabel}` : ''}
                </Text>
              </Card>
            </Link>
          ))
        )}
      </View>
    </ScrollView>
  );
}
