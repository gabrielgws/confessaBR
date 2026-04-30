import { Link, router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';

export default function LandingScreen() {
  const { bootstrapState, isAuthenticated, isVisitor, visit, user } = useAuthSession();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="grow justify-between px-6 pb-8 pt-10">
        <View className="gap-8">
          <View className="gap-3">
            <Text className="text-sm font-semibold uppercase text-teal-700">Anonimo por padrao</Text>
            <Text className="text-5xl font-bold text-zinc-950">ConfessaBR</Text>
            <Text className="text-lg leading-7 text-zinc-700">
              Entre em salas, envie mensagens anonimas e descubra conversas por regiao com
              privacidade desde o primeiro toque.
            </Text>
          </View>

          <View className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <Text className="text-base font-semibold text-zinc-950">O que voce pode fazer</Text>
            <View className="mt-3 gap-2">
              <Text className="text-sm leading-5 text-zinc-700">Criar ou entrar em salas privadas.</Text>
              <Text className="text-sm leading-5 text-zinc-700">Receber confissoes sem expor remetentes.</Text>
              <Text className="text-sm leading-5 text-zinc-700">Controlar perfil, radar e notificacoes.</Text>
            </View>
          </View>
        </View>

        <View className="mt-10 gap-3">
          {bootstrapState.isPending ? (
            <Text className="text-center text-base font-semibold text-zinc-700">
              Preparando sua sessao...
            </Text>
          ) : isAuthenticated ? (
            <>
              <Text className="text-center text-base font-semibold text-zinc-800">
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
              <Button
                title={isVisitor ? 'Visitando agora' : 'Continuar como visitante'}
                variant="ghost"
                onPress={visit}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
