import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { Button, Card, ErrorState, Header, Input, SuccessState, Tabs } from '@/components/ui';
import { useRooms } from '@/features/rooms/use-rooms';
import type { RoomVisibility } from '@/types/rooms';

export default function CreateRoomScreen() {
  const { createRoom, createState } = useRooms();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<RoomVisibility>('private');

  async function submit() {
    await createRoom({ name, description, visibility });
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Criar sala" subtitle="Permissoes e codigo sao validados pelo backend." />
      <Card className="gap-4">
        <Input label="Nome" value={name} onChangeText={setName} />
        <Input label="Descricao" value={description} onChangeText={setDescription} multiline />
        <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Visibilidade</Text>
        <Tabs
          value={visibility}
          values={['private', 'public', 'region']}
          labels={{ private: 'Privada', public: 'Publica', region: 'Regiao' }}
          onValueChange={setVisibility}
        />
        <Button title="Criar sala" disabled={!name || createState.isPending} onPress={submit} />
        {createState.error ? <ErrorState title="Sala nao criada" description={createState.error.message} /> : null}
        {createState.isSuccess ? <SuccessState title="Sala criada" /> : null}
      </Card>
    </ScrollView>
  );
}
