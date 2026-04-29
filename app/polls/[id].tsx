import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Share, ScrollView, Text, View } from 'react-native';

import { Badge, Button, Card, EmptyState, ErrorState, Header, Input, LoadingState, SuccessState } from '@/components/ui';
import { usePoll } from '@/features/polls/use-polls';

export default function PollDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const poll = usePoll(id);
  const [invitationId, setInvitationId] = useState('');
  const [invitees, setInvitees] = useState('');

  async function sharePoll() {
    const payload = await poll.getSafeSharePayload();
    await Share.share({ message: payload.url ? `${payload.text}\n${payload.url}` : payload.text });
  }

  if (poll.isLoading) {
    return <LoadingState title="Carregando poll" />;
  }

  if (poll.error) {
    return <ErrorState title="Poll indisponivel" description={poll.error.message} />;
  }

  if (!poll.poll) {
    return <EmptyState title="Poll nao encontrado" />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Poll" subtitle="Voto unico e resultados sob autoridade do backend" />
      <View className="gap-4">
        <Card className="gap-3">
          <Badge label={poll.poll.status} />
          <Text className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{poll.poll.question}</Text>
          <Text className="text-sm text-zinc-600 dark:text-zinc-300">
            Categoria: {poll.poll.category}
          </Text>
        </Card>

        {poll.poll.options.map((option) => (
          <Button
            key={option.id}
            title={option.label}
            variant={poll.poll?.userVoteOptionId === option.id ? 'secondary' : 'ghost'}
            disabled={poll.poll?.status !== 'open' || Boolean(poll.poll?.userVoteOptionId) || poll.voteState.isPending}
            onPress={() => poll.vote({ optionId: option.id })}
          />
        ))}

        {poll.voteState.error ? <ErrorState title="Voto nao registrado" description={poll.voteState.error.message} /> : null}
        {poll.voteState.isSuccess ? <SuccessState title="Voto registrado" /> : null}

        <Card className="gap-3">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Resultados</Text>
          {poll.results.length === 0 ? (
            <Text className="text-sm text-zinc-600 dark:text-zinc-300">
              Resultados aparecem depois do fechamento, conforme regra do backend.
            </Text>
          ) : (
            poll.results.map((result) => (
              <Text key={result.optionId} className="text-sm text-zinc-700 dark:text-zinc-200">
                #{result.rank} {result.label}: {result.voteCount} votos
              </Text>
            ))
          )}
          <Button title="Compartilhar resultado seguro" variant="secondary" onPress={sharePoll} />
          <Button title="Fechar poll" variant="ghost" disabled={poll.poll.status !== 'open' || poll.closeState.isPending} onPress={() => poll.closePoll()} />
          {poll.closeState.error ? <ErrorState title="Poll nao fechado" description={poll.closeState.error.message} /> : null}
          {poll.closeState.isSuccess ? <SuccessState title="Poll fechado" /> : null}
        </Card>

        <Card className="gap-3">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Convites e consentimento</Text>
          <Input label="IDs de usuarios separados por virgula" value={invitees} onChangeText={setInvitees} />
          <Button
            title="Convidar participantes"
            disabled={!invitees || poll.inviteState.isPending}
            onPress={() =>
              poll.inviteParticipants({
                userIds: invitees
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
          />
          <Input label="ID do convite" value={invitationId} onChangeText={setInvitationId} />
          <View className="flex-row gap-3">
            <Button title="Aceitar" className="flex-1" disabled={!invitationId || poll.consentState.isPending} onPress={() => poll.acceptInvitation(invitationId)} />
            <Button title="Recusar" variant="secondary" className="flex-1" disabled={!invitationId || poll.consentState.isPending} onPress={() => poll.refuseInvitation(invitationId)} />
          </View>
          {poll.inviteState.error ? <ErrorState title="Convite nao enviado" description={poll.inviteState.error.message} /> : null}
          {poll.inviteState.isSuccess ? <SuccessState title="Convites enviados" /> : null}
          {poll.consentState.error ? <ErrorState title="Resposta nao registrada" description={poll.consentState.error.message} /> : null}
          {poll.consentState.isSuccess ? <SuccessState title="Resposta registrada" /> : null}
        </Card>
      </View>
    </ScrollView>
  );
}
