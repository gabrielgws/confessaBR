import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from '@/services/query-client';
import { useAuthStore } from '@/store/auth.store';
import {
  addNotificationLifecycleListeners,
  configureNotificationHandling,
} from '@/utils/push-notifications';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const bootstrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    configureNotificationHandling();
    void bootstrap();
    const removeNotificationListeners = addNotificationLifecycleListeners();

    return () => {
      removeNotificationListeners();
    };
  }, [bootstrap]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          initialRouteName="index"
          screenOptions={{
            contentStyle: { backgroundColor: '#ffffff' },
          }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="rooms/[id]" options={{ title: 'Sala' }} />
          <Stack.Screen name="polls/[id]" options={{ title: 'Poll' }} />
          <Stack.Screen name="settings" options={{ title: 'Configuracoes' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
