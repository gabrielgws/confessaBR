import { Link, useLocalSearchParams } from 'expo-router';
import type { Href } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button, Card, EmptyState, ErrorState, Header, Input, LoadingState, SuccessState } from '@/components/ui';
import { RoomFeedItemView } from '@/features/rooms/room-feed-item';
import { useRoomFeed } from '@/features/rooms/use-room-feed';
import { useRoomMembers, useRooms } from '@/features/rooms/use-rooms';

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { rooms, leaveRoom, leaveState } = useRooms();
  const room = rooms.find((item) => item.id === id);
  const members = useRoomMembers(id);
  const feed = useRoomFeed(id);
  const [body, setBody] = useState('');
  const [pollIdToOpen, setPollIdToOpen] = useState('');
  const [reportReasonById, setReportReasonById] = useState<Record<string, string>>({});

  if (!id) {
    return <EmptyState title="Sala nao encontrada" />;
  }

  if (feed.isLoading) {
    return <LoadingState title="Carregando sala" />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title={room?.name ?? 'Sala'} subtitle={`${members.members.length} membros carregados`} />
      <View className="gap-4">
        {feed.error ? <ErrorState title="Feed indisponivel" description={feed.error.message} /> : null}

        <Card className="gap-3">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Feed anonimo</Text>
          <Input label="Mensagem" value={body} onChangeText={setBody} multiline />
          <Button title="Postar" disabled={!body || feed.postState.isPending} onPress={() => feed.postFeedItem(body).then(() => setBody(''))} />
          {feed.postState.error ? <ErrorState title="Post nao enviado" description={feed.postState.error.message} /> : null}
          {feed.postState.isSuccess ? <SuccessState title="Mensagem publicada" /> : null}
        </Card>

        <View className="flex-row gap-3">
          <Link
            href={{ pathname: '/(modals)/create-poll', params: { roomId: id } } as unknown as Href}
            asChild>
            <Button title="Criar poll" className="flex-1" />
          </Link>
          <Button title="Sair" variant="ghost" className="flex-1" disabled={leaveState.isPending} onPress={() => leaveRoom(id)} />
        </View>

        <Card className="gap-3">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Abrir poll</Text>
          <Input label="ID do poll" value={pollIdToOpen} onChangeText={setPollIdToOpen} />
          <Link
            href={{ pathname: '/polls/[id]', params: { id: pollIdToOpen || 'poll' } } as unknown as Href}
            asChild>
            <Button title="Abrir poll" variant="secondary" disabled={!pollIdToOpen} />
          </Link>
        </Card>

        {room?.permissions.canModerate ? (
          <Card>
            <Text className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Controles de moderador disponiveis para conteudo reportado.
            </Text>
          </Card>
        ) : null}

        {feed.feed.length === 0 ? (
          <EmptyState title="Sem mensagens" description="Publique a primeira mensagem anonima da sala." />
        ) : (
          feed.feed.map((item) => (
            <RoomFeedItemView
              key={item.id}
              item={item}
              action={
                <View className="gap-2">
                  <Input
                    label="Motivo do report"
                    value={reportReasonById[item.id] ?? ''}
                    onChangeText={(reason) => setReportReasonById((current) => ({ ...current, [item.id]: reason }))}
                  />
                  <Button
                    title="Reportar"
                    variant="danger"
                    disabled={!reportReasonById[item.id] || feed.reportState.isPending}
                    onPress={() => feed.reportFeedItem(item.id, reportReasonById[item.id])}
                  />
                </View>
              }
            />
          ))
        )}

        <Card className="gap-2">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Membros</Text>
          {members.error ? <Text className="text-sm text-red-600">{members.error.message}</Text> : null}
          {members.members.map((membership) => (
            <Text key={membership.id} className="text-sm text-zinc-700 dark:text-zinc-200">
              {membership.user?.displayName ?? membership.userId} - {membership.role}
            </Text>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}
