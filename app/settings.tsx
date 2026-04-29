import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { ScrollView, Switch, Text, View } from 'react-native';

import { Button, Card, Header } from '@/components/ui';
import { useAuthSession } from '@/features/auth/use-auth-session';
import { useNotifications } from '@/features/notifications/use-notifications';
import { useProfile } from '@/features/profile/use-profile';

export default function SettingsScreen() {
  const { signOut } = useAuthSession();
  const { user, updatePrivacy } = useProfile();
  const notifications = useNotifications();

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
        {notifications.preferences ? (
          <Card className="gap-4">
            <Text className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Notificacoes
            </Text>
            <SettingToggle
              title="Mensagens anonimas"
              value={notifications.preferences.newMessagesEnabled}
              onValueChange={(newMessagesEnabled) =>
                notifications.updatePreferences({ newMessagesEnabled })
              }
            />
            <SettingToggle
              title="Convites de enquete"
              value={notifications.preferences.pollInvitesEnabled}
              onValueChange={(pollInvitesEnabled) =>
                notifications.updatePreferences({ pollInvitesEnabled })
              }
            />
            <SettingToggle
              title="Resultados de enquete"
              value={notifications.preferences.pollResultsEnabled}
              onValueChange={(pollResultsEnabled) =>
                notifications.updatePreferences({ pollResultsEnabled })
              }
            />
            <SettingToggle
              title="Confirmacoes de pagamento"
              value={notifications.preferences.paymentsEnabled}
              onValueChange={(paymentsEnabled) => notifications.updatePreferences({ paymentsEnabled })}
            />
            <Button
              title="Permitir push neste aparelho"
              disabled={notifications.deviceRegistrationState.isPending}
              onPress={notifications.requestPermissionAndRegister}
            />
            <Link href={'/(modals)/notifications' as Href} asChild>
              <Button title="Historico de notificacoes" variant="ghost" />
            </Link>
            {notifications.deviceRegistrationState.error ? (
              <Text className="text-sm text-red-700 dark:text-red-300">
                {notifications.deviceRegistrationState.error.message}
              </Text>
            ) : null}
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
