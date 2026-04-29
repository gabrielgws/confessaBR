import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';

import { Avatar, Button, Card, ErrorState, Header, Input, SuccessState } from '@/components/ui';
import { useProfile } from '@/features/profile/use-profile';

export default function ProfileScreen() {
  const { user, updateProfile, updatePrivacy, updateNotificationPreferences, profileState, privacyState, notificationState } =
    useProfile();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  if (!user) {
    return <ErrorState title="Perfil indisponivel" description="Entre novamente para carregar seus dados." />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Perfil" subtitle={`@${user.username}`} />
      <View className="gap-4">
        <Card className="items-center gap-3">
          <Avatar name={user.displayName} uri={user.avatarUrl} size="lg" />
          <Text className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{user.displayName}</Text>
          <Text className="text-center text-sm text-zinc-600 dark:text-zinc-300">{user.bio ?? 'Sem bio'}</Text>
        </Card>

        <Card className="gap-3">
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Editar perfil</Text>
          <Input label="Nome publico" value={displayName} onChangeText={setDisplayName} />
          <Input label="Bio" value={bio} onChangeText={setBio} multiline />
          <Button title="Salvar perfil" disabled={profileState.isPending} onPress={() => updateProfile({ displayName, bio })} />
          {profileState.error ? <ErrorState title="Perfil nao salvo" description={profileState.error.message} /> : null}
          {profileState.isSuccess ? <SuccessState title="Perfil atualizado" /> : null}
        </Card>

        <PreferenceCard
          title="Aceitar mensagens anonimas"
          value={user.privacySettings.allowAnonymousMessages}
          onValueChange={(allowAnonymousMessages) => updatePrivacy({ allowAnonymousMessages })}
        />
        <PreferenceCard
          title="Permitir pedidos de revelar remetente"
          value={user.privacySettings.allowSenderRevealRequests}
          onValueChange={(allowSenderRevealRequests) => updatePrivacy({ allowSenderRevealRequests })}
        />
        <PreferenceCard
          title="Notificar novas mensagens"
          value={user.notificationSettings.newMessagesEnabled}
          onValueChange={(newMessagesEnabled) => updateNotificationPreferences({ newMessagesEnabled })}
        />

        {privacyState.error ? <ErrorState title="Privacidade nao salva" description={privacyState.error.message} /> : null}
        {notificationState.error ? (
          <ErrorState title="Preferencias nao salvas" description={notificationState.error.message} />
        ) : null}
      </View>
    </ScrollView>
  );
}

function PreferenceCard({
  title,
  value,
  onValueChange,
}: {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <Card className="flex-row items-center justify-between gap-4">
      <Text className="flex-1 text-base font-medium text-zinc-950 dark:text-zinc-50">{title}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </Card>
  );
}
