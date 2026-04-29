import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';

import { Button, Card, ErrorState, Header, Input, SuccessState } from '@/components/ui';
import { useReport } from '@/features/moderation/use-report';
import type { ReportTargetType } from '@/types/moderation';

export default function ReportScreen() {
  const { targetType, targetId, roomId } = useLocalSearchParams<{
    targetType: ReportTargetType;
    targetId: string;
    roomId?: string;
  }>();
  const [reason, setReason] = useState('');
  const report = useReport();

  async function submit() {
    await report.submitReport({ targetType, targetId, roomId, reason });
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Reportar" subtitle="Duplicidade e permissao sao validadas pelo backend." />
      <Card className="gap-4">
        <Input label="Motivo" value={reason} onChangeText={setReason} multiline />
        <Button title="Enviar report" variant="danger" disabled={!reason || report.isPending} onPress={submit} />
        {report.error ? <ErrorState title="Report nao enviado" description={report.error.message} /> : null}
        {report.isSuccess ? <SuccessState title="Report enviado" /> : null}
      </Card>
    </ScrollView>
  );
}
