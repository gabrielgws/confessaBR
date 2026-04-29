import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button, Card, EmptyState, ErrorState, Header, Input, LoadingState, SuccessState, Tabs } from '@/components/ui';
import { useModerationQueue } from '@/features/moderation/use-moderation';
import type { ModerationActionType } from '@/types/moderation';

export default function ModerationQueueScreen() {
  const { queue, isLoading, error, applyAction, actionState } = useModerationQueue();
  const [actionType, setActionType] = useState<ModerationActionType>('hide');
  const [reasonByTarget, setReasonByTarget] = useState<Record<string, string>>({});

  if (isLoading) {
    return <LoadingState title="Carregando fila" />;
  }

  if (error) {
    return <ErrorState title="Fila indisponivel" description={error.message} />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Moderacao" subtitle="Acoes dependem de permissao de moderador." />
      <View className="gap-4">
        {queue.length === 0 ? <EmptyState title="Fila vazia" /> : null}
        <Tabs
          value={actionType}
          values={['hide', 'remove', 'block', 'ban']}
          labels={{ hide: 'Ocultar', remove: 'Remover', block: 'Bloquear', ban: 'Banir' }}
          onValueChange={setActionType}
        />
        {queue.map((item) => {
          const key = item.report.targetId;
          const reason = reasonByTarget[key] ?? '';

          return (
            <Card key={item.report.id} className="gap-3">
              <Text className="font-semibold text-zinc-950 dark:text-zinc-50">
                {item.report.targetType} - {item.report.status}
              </Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-300">{item.targetPreview}</Text>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                Reports relacionados: {item.duplicateCount + 1}
              </Text>
              <Input
                label="Motivo da acao"
                value={reason}
                onChangeText={(value) => setReasonByTarget((current) => ({ ...current, [key]: value }))}
              />
              <Button
                title="Aplicar acao"
                variant="danger"
                disabled={!reason || actionState.isPending}
                onPress={() =>
                  applyAction({
                    targetType: item.report.targetType,
                    targetId: item.report.targetId,
                    actionType,
                    reason,
                    reportIds: [item.report.id],
                  })
                }
              />
            </Card>
          );
        })}
        {actionState.error ? <ErrorState title="Acao nao aplicada" description={actionState.error.message} /> : null}
        {actionState.isSuccess ? <SuccessState title="Acao aplicada" /> : null}
      </View>
    </ScrollView>
  );
}
