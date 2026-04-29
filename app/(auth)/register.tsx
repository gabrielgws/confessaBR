import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button, ErrorState, Input, LoadingState, SuccessState } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';

export default function RegisterScreen() {
  const { register, registerState } = useAuthSession();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const usernameError = registerState.error?.fieldErrors?.username?.[0];

  async function submit() {
    await register({ username, displayName, password, passwordConfirmation });
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="grow justify-center p-6">
      <View className="gap-6">
        <View>
          <Text className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">Criar conta</Text>
          <Text className="mt-2 text-base text-zinc-600 dark:text-zinc-300">
            Escolha um usuario unico e mantenha controle sobre sua privacidade.
          </Text>
        </View>

        <View className="gap-4">
          <Input label="Usuario" autoCapitalize="none" value={username} error={usernameError} onChangeText={setUsername} />
          <Input label="Nome publico" value={displayName} onChangeText={setDisplayName} />
          <Input label="Senha" secureTextEntry value={password} onChangeText={setPassword} />
          <Input label="Confirmar senha" secureTextEntry value={passwordConfirmation} onChangeText={setPasswordConfirmation} />
          <Button
            title="Criar conta"
            disabled={!username || !displayName || !password || password !== passwordConfirmation || registerState.isPending}
            onPress={submit}
          />
        </View>

        {registerState.isPending ? <LoadingState title="Criando conta" /> : null}
        {registerState.error ? <ErrorState title="Nao foi possivel criar a conta" description={registerState.error.message} /> : null}
        {registerState.isSuccess ? <SuccessState title="Conta criada" /> : null}

        <Link href="/(auth)/login" className="text-center text-teal-700 dark:text-teal-300">
          Ja tenho conta
        </Link>
      </View>
    </ScrollView>
  );
}
