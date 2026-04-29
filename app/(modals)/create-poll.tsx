import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { Button, Card, ErrorState, Header, Input, SuccessState, Tabs } from '@/components/ui';
import { positivePollCategories, validatePositivePollDraft } from '@/features/polls/poll-rules';
import { useCreatePoll } from '@/features/polls/use-polls';
import type { PositivePollCategory } from '@/types/polls';

export default function CreatePollScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { createPoll, isPending, isSuccess, error } = useCreatePoll();
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<PositivePollCategory>('admiration');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const validationError = validatePositivePollDraft({
    question,
    category,
    options: [optionA, optionB, optionC],
  });

  async function submit() {
    if (!roomId || validationError) {
      return;
    }

    await createPoll({
      roomId,
      question,
      category,
      options: [optionA, optionB, optionC].filter(Boolean),
    });
    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Criar poll positivo" subtitle="As regras finais de elegibilidade sao do backend." />
      <Card className="gap-4">
        <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Categoria</Text>
        <Tabs
          value={category}
          values={positivePollCategories.map((item) => item.value)}
          labels={Object.fromEntries(positivePollCategories.map((item) => [item.value, item.label]))}
          onValueChange={setCategory}
        />
        <Input label="Pergunta" value={question} onChangeText={setQuestion} />
        <Input label="Opcao 1" value={optionA} onChangeText={setOptionA} />
        <Input label="Opcao 2" value={optionB} onChangeText={setOptionB} />
        <Input label="Opcao 3" value={optionC} onChangeText={setOptionC} />
        {validationError ? <Text className="text-sm text-amber-700 dark:text-amber-300">{validationError}</Text> : null}
        <Button title="Criar poll" disabled={Boolean(validationError) || isPending} onPress={submit} />
        {error ? <ErrorState title="Poll nao criado" description={error.message} /> : null}
        {isSuccess ? <SuccessState title="Poll criado" /> : null}
      </Card>
    </ScrollView>
  );
}
