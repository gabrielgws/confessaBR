import { Link, useLocalSearchParams, router } from 'expo-router';
import type { Href } from 'expo-router';
import { useState } from 'react';
import { Share, ScrollView, Text, View } from 'react-native';

import { Badge, Button, Card, EmptyState, ErrorState, Header, Input, LoadingState, SuccessState } from '@/components/ui';
import { useInbox, useInboxMessage } from '@/features/inbox/use-inbox';
import { useRevealSender } from '@/features/inbox/use-reveal-sender';
import { useShareMessage } from '@/features/inbox/use-share-message';
import { reportHref } from '@/features/moderation/report-targets';

export default function MessageDetailScreen() {
  const { messageId } = useLocalSearchParams<{ messageId: string }>();
  const messageQuery = useInboxMessage(messageId);
  const { archiveMessage, reportMessage, archiveState, reportState } = useInbox();
  const [reason, setReason] = useState('');
  const message = messageQuery.data;
  const reveal = useRevealSender(message);
  const share = useShareMessage(message);

  async function shareMessage() {
    if (!message) {
      return;
    }

    const payload = await share.getSafeSharePayload();

    if (!payload) {
      return;
    }

    await Share.share({ message: payload.url ? `${payload.text}\n${payload.url}` : payload.text });
  }

  if (messageQuery.isPending) {
    return <LoadingState title="Abrindo mensagem" />;
  }

  if (messageQuery.error) {
    return <ErrorState title="Mensagem indisponivel" description="Nao foi possivel abrir esta mensagem." />;
  }

  if (!message) {
    return <EmptyState title="Mensagem nao encontrada" />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Mensagem" subtitle={message.senderAlias} />
      <View className="gap-4">
        <Card className="gap-3">
          <Badge label={message.revealStatus === 'reveal_unlocked' ? 'revelada' : 'anonima'} />
          <Text className="text-lg leading-7 text-zinc-950 dark:text-zinc-50">{message.body}</Text>
          <Text className="text-xs text-zinc-500 dark:text-zinc-400">
            Compartilhamentos removem identidade, pagamento, moderacao e metadados sensiveis.
          </Text>
        </Card>

        <View className="gap-3">
          <Button title="Compartilhar com seguranca" variant="secondary" onPress={shareMessage} />
          <Button title="Arquivar" variant="ghost" disabled={archiveState.isPending} onPress={() => archiveMessage(message.id).then(() => router.back())} />
          <Button
            title={reveal.isPaymentUnlocked ? 'Revelar remetente' : 'Revelacao bloqueada por pagamento'}
            disabled={!reveal.canAttemptReveal || !reveal.isPaymentUnlocked || reveal.state.isPending}
            onPress={() => reveal.reveal()}
          />
          {!reveal.isPaymentUnlocked && reveal.canAttemptReveal ? (
            <Link
              href={
                {
                  pathname: '/(modals)/payment-checkout',
                  params: {
                    capability: 'sender_reveal',
                    targetType: 'anonymous_message',
                    targetId: message.id,
                  },
                } as unknown as Href
              }
              asChild>
              <Button title="Iniciar checkout de reveal" variant="secondary" />
            </Link>
          ) : null}
        </View>

        {reveal.state.data?.senderDisplayName ? <SuccessState title={`Remetente: ${reveal.state.data.senderDisplayName}`} /> : null}
        {reveal.state.error ? <ErrorState title="Reveal indisponivel" description={reveal.state.error.message} /> : null}

        <Card className="gap-3">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Reportar</Text>
          <Input label="Motivo" value={reason} onChangeText={setReason} multiline />
          <Button title="Enviar report" variant="danger" disabled={!reason || reportState.isPending} onPress={() => reportMessage(message.id, reason)} />
          {reportState.error ? <ErrorState title="Report nao enviado" description={reportState.error.message} /> : null}
          {reportState.isSuccess ? <SuccessState title="Report enviado" /> : null}
          <Link href={reportHref({ targetType: 'message', targetId: message.id }) as unknown as Href} asChild>
            <Button title="Abrir report avancado" variant="ghost" />
          </Link>
        </Card>
      </View>
    </ScrollView>
  );
}
