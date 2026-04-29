import { ScrollView, Switch, Text, View } from 'react-native';

import { Button, Card, Header } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';
import { useProfile } from '@/features/profile/use-profile';

export default function SettingsScreen() {
  const { signOut } = useAuthSession();
  const { user, updatePrivacy } = useProfile();

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Configuracoes" subtitle="Privacidade e sessao" />
      <View className="gap-4">
        {user ? (
          <Card className="gap-4">
            <SettingToggle
              title="Aparecer no radar"
              value={user.privacySettings.showInRadar}
              onValueChange={(showInRadar) => updatePrivacy({ showInRadar })}
            />
            <SettingToggle
              title="Compartilhar perfil com salas"
              value={user.privacySettings.shareProfileWithRooms}
              onValueChange={(shareProfileWithRooms) => updatePrivacy({ shareProfileWithRooms })}
            />
          </Card>
        ) : null}
        <Button title="Sair" variant="danger" onPress={signOut} />
      </View>
    </ScrollView>
  );
}

function SettingToggle({
  title,
  value,
  onValueChange,
}: {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <Text className="flex-1 text-base text-zinc-950 dark:text-zinc-50">{title}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
