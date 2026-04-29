import { Link, router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Button, Card } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';

export default function LandingScreen() {
  const { isAuthenticated, isVisitor, visit, user } = useAuthSession();

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="grow justify-center p-6">
      <View className="gap-8">
        <View className="gap-3">
          <Text className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">ConfessaBR</Text>
          <Text className="text-base leading-6 text-zinc-600 dark:text-zinc-300">
            Entre em salas, receba mensagens anonimas e controle sua privacidade sem expor quem
            enviou o que.
          </Text>
        </View>

        <Card className="gap-4">
          {isAuthenticated ? (
            <>
              <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Ola, {user?.displayName ?? 'voce'}
              </Text>
              <Button title="Ir para o inicio" onPress={() => router.replace('/(tabs)/home')} />
            </>
          ) : (
            <>
              <Link href="/(auth)/login" asChild>
                <Button title="Entrar" />
              </Link>
              <Link href="/(auth)/register" asChild>
                <Button title="Criar conta" variant="secondary" />
              </Link>
              <Button title={isVisitor ? 'Visitando agora' : 'Continuar como visitante'} variant="ghost" onPress={visit} />
            </>
          )}
        </Card>
      </View>
    </ScrollView>
  );
}
