import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ presentation: 'modal', headerShown: false }}>
      <Stack.Screen name="create-poll" />
      <Stack.Screen name="create-room" />
      <Stack.Screen name="join-room" />
      <Stack.Screen name="message-detail" />
      <Stack.Screen name="moderation-queue" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="payment-checkout" />
      <Stack.Screen name="proximity-chat" />
      <Stack.Screen name="report" />
      <Stack.Screen name="send-message" />
    </Stack>
  );
}
