import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button, Card, Header, Input, SuccessState } from '@/components/ui';
import { useRadar } from '@/features/radar/use-radar';
import type { RadarDistanceFilter } from '@/types/radar';

function toDistanceFilter(value: string | string[] | undefined): RadarDistanceFilter {
  const parsed = Number(Array.isArray(value) ? value[0] : value);

  if (parsed === 500 || parsed === 1000 || parsed === 3000 || parsed === 5000 || parsed === 10000) {
    return parsed;
  }

  return 3000;
}

export default function ProximityChatModal() {
  const params = useLocalSearchParams<{ regionId?: string; distanceMeters?: string; topic?: string }>();
  const radar = useRadar();
  const [topic, setTopic] = useState(params.topic ?? '');
  const [chatId, setChatId] = useState<string | null>(null);

  async function startChat() {
    if (!params.regionId) {
      return;
    }

    const chat = await radar.startProximityChat({
      regionId: params.regionId,
      distanceMeters: toDistanceFilter(params.distanceMeters),
      topic,
    });

    setChatId(chat.id);
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Chat temporario" subtitle="Anonimo e limitado a regiao" />
      <View className="gap-4">
        <Card className="gap-3">
          <Text className="text-sm leading-5 text-zinc-600 dark:text-zinc-300">
            O chat usa elegibilidade e expiracao do backend. A tela nao recebe localizacao exata.
          </Text>
          <Input label="Assunto" value={topic} onChangeText={setTopic} placeholder="Ex.: rolando agora" />
          <Button
            title="Iniciar chat"
            disabled={!params.regionId || radar.proximityChatState.isPending}
            onPress={startChat}
          />
          {radar.proximityChatState.error ? (
            <Text className="text-sm text-red-700 dark:text-red-300">
              {radar.proximityChatState.error.message}
            </Text>
          ) : null}
        </Card>
        {chatId ? (
          <SuccessState
            title="Chat criado"
            description="A conversa temporaria esta ativa para pessoas elegiveis nessa regiao."
          />
        ) : null}
      </View>
    </ScrollView>
  );
}
