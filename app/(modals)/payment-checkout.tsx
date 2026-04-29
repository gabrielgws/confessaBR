import { Linking, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Badge, Button, Card, ErrorState, Header, LoadingState } from '@/components/ui';
import { usePaymentCheckout } from '@/features/payments/use-payments';
import type { PaidCapability, PaymentTargetType } from '@/types/payments';

export default function PaymentCheckoutScreen() {
  const { paymentId, capability = 'sender_reveal', targetType = 'anonymous_message', targetId } =
    useLocalSearchParams<{
      paymentId?: string;
      capability?: PaidCapability;
      targetType?: PaymentTargetType;
      targetId?: string;
    }>();
  const checkout = usePaymentCheckout(paymentId);

  async function start() {
    if (!targetId) {
      return;
    }

    const payment = await checkout.startCheckout({ capability, targetType, targetId });

    if (payment.checkoutUrl) {
      await Linking.openURL(payment.checkoutUrl);
    }
  }

  if (checkout.isPending && paymentId) {
    return <LoadingState title="Verificando pagamento" />;
  }

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header title="Checkout" subtitle="Desbloqueio so ocorre com confirmacao do backend." />
      <View className="gap-4">
        <Card className="gap-3">
          <Badge label={checkout.payment?.status ?? 'bloqueado'} />
          <Text className="text-base text-zinc-700 dark:text-zinc-200">
            Capacidade: {capability}. Alvo: {targetId ?? checkout.payment?.targetId ?? 'indefinido'}.
          </Text>
          <Button title="Iniciar pagamento" disabled={!targetId || checkout.isPending} onPress={start} />
          {checkout.payment?.checkoutUrl ? (
            <Button title="Abrir checkout" variant="secondary" onPress={() => Linking.openURL(checkout.payment?.checkoutUrl ?? '')} />
          ) : null}
        </Card>
        {checkout.error ? <ErrorState title="Pagamento indisponivel" description={checkout.error.message} /> : null}
      </View>
    </ScrollView>
  );
}
