import { Link, router } from 'expo-router';
import type { Href } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Badge, Button, Card, EmptyState, Header, LoadingState } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';

export default function HomeScreen() {
  const { status, user, bootstrapState, isAuthenticated } = useAuthSession();

  useEffect(() => {
    if (status === 'anonymous' || status === 'visitor') {
      router.replace('/');
    }
  }, [status]);

  if (bootstrapState.isPending) {
    return <LoadingState title="Carregando sessao" />;
  }

  if (!isAuthenticated) {
    return <EmptyState title="Acesso restrito" description="Entre para acessar as areas autenticadas." />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Inicio" subtitle={`@${user?.username ?? 'usuario'}`} action={{ label: 'Ajustes', onPress: () => router.push('/settings') }} />
      <View className="gap-4">
        <Card className="gap-3">
          <Badge label="P1 MVP" variant="success" />
          <Text className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Sua identidade esta pronta
          </Text>
          <Text className="text-sm leading-5 text-zinc-600 dark:text-zinc-300">
            Agora voce pode receber mensagens anonimas, abrir inbox e ajustar preferencias de
            privacidade.
          </Text>
        </Card>
        <Link href="/(modals)/send-message" asChild>
          <Button title="Enviar mensagem anonima" />
        </Link>
        <Link href="/(tabs)/inbox" asChild>
          <Button title="Abrir inbox" variant="secondary" />
        </Link>
        <Link href={'/(tabs)/rooms' as Href} asChild>
          <Button title="Ver salas" variant="ghost" />
        </Link>
        <Link href={'/(modals)/moderation-queue' as Href} asChild>
          <Button title="Fila de moderacao" variant="ghost" />
        </Link>
      </View>
    </ScrollView>
  );
}
