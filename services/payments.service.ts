import { api } from '@/services/api';
import type { PaidCapability, PaymentCapability } from '@/types/payments';

export async function getCapability(
  capability: PaidCapability,
  targetId: string,
): Promise<PaymentCapability> {
  const response = await api.get<PaymentCapability>(`/payments/capabilities/${capability}/${targetId}`);

  return response.data;
}
