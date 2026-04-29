import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';

import { Button, Card, ErrorState, Header, Input, SuccessState } from '@/components/ui';
import { useSendMessage } from '@/features/inbox/use-send-message';

export default function SendMessageScreen() {
  const { sendMessage, isPending, isSuccess, error } = useSendMessage();
  const [recipientUsername, setRecipientUsername] = useState('');
  const [body, setBody] = useState('');
  const [allowRevealRequest, setAllowRevealRequest] = useState(false);

  async function submit() {
    await sendMessage({ recipientUsername, body, allowRevealRequest });
    setBody('');
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Enviar anonima" subtitle="A identidade do remetente fica sob autoridade do backend." />
      <View className="gap-4">
        <Card className="gap-4">
          <Input label="Usuario destinatario" autoCapitalize="none" value={recipientUsername} onChangeText={setRecipientUsername} />
          <Input label="Mensagem" value={body} onChangeText={setBody} multiline />
          <View className="flex-row items-center justify-between gap-4">
            <Text className="flex-1 text-sm text-zinc-700 dark:text-zinc-200">Permitir pedido de revelacao pago</Text>
            <Switch value={allowRevealRequest} onValueChange={setAllowRevealRequest} />
          </View>
          <Button title="Enviar" disabled={!recipientUsername || !body || isPending} onPress={submit} />
        </Card>
        {error ? <ErrorState title="Mensagem nao enviada" description={error.message} /> : null}
        {isSuccess ? <SuccessState title="Mensagem enviada" /> : null}
      </View>
    </ScrollView>
  );
}
