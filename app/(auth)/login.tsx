import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button, ErrorState, Input, LoadingState, SuccessState } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';

export default function LoginScreen() {
  const { login, loginState } = useAuthSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    await login({ username, password });
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="grow justify-center p-6">
      <View className="gap-6">
        <View>
          <Text className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">Entrar</Text>
          <Text className="mt-2 text-base text-zinc-600 dark:text-zinc-300">
            Use sua conta para acessar inbox, perfil e salas.
          </Text>
        </View>

        <View className="gap-4">
          <Input label="Usuario" autoCapitalize="none" value={username} onChangeText={setUsername} />
          <Input label="Senha" secureTextEntry value={password} onChangeText={setPassword} />
          <Button title="Entrar" disabled={!username || !password || loginState.isPending} onPress={submit} />
        </View>

        {loginState.isPending ? <LoadingState title="Entrando" /> : null}
        {loginState.error ? <ErrorState title="Nao foi possivel entrar" description={loginState.error.message} /> : null}
        {loginState.isSuccess ? <SuccessState title="Sessao iniciada" /> : null}

        <Link href="/(auth)/register" className="text-center text-teal-700 dark:text-teal-300">
          Criar uma conta
        </Link>
      </View>
    </ScrollView>
  );
}
