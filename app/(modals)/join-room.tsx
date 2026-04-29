import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';

import { Button, Card, ErrorState, Header, Input, SuccessState } from '@/components/ui';
import { useRooms } from '@/features/rooms/use-rooms';

export default function JoinRoomScreen() {
  const { joinRoom, joinState } = useRooms();
  const [joinCode, setJoinCode] = useState('');

  async function submit() {
    await joinRoom({ joinCode });
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Entrar por codigo" subtitle="A validade do codigo e acesso sao do backend." />
      <Card className="gap-4">
        <Input label="Codigo" autoCapitalize="characters" value={joinCode} onChangeText={setJoinCode} />
        <Button title="Entrar" disabled={!joinCode || joinState.isPending} onPress={submit} />
        {joinState.error ? <ErrorState title="Nao foi possivel entrar" description={joinState.error.message} /> : null}
        {joinState.isSuccess ? <SuccessState title="Voce entrou na sala" /> : null}
      </Card>
    </ScrollView>
  );
}
