import { api } from '@/services/api';
import type { CreatePaymentRequest, PaidCapability, Payment, PaymentCapability } from '@/types/payments';

export async function createPayment(payload: CreatePaymentRequest): Promise<Payment> {
  const response = await api.post<Payment>('/payments', payload);

  return response.data;
}

export async function getPayment(paymentId: string): Promise<Payment> {
  const response = await api.get<Payment>(`/payments/${paymentId}`);

  return response.data;
}

export async function getCapability(
  capability: PaidCapability,
  targetId: string,
): Promise<PaymentCapability> {
  const response = await api.get<PaymentCapability>(`/payments/capabilities/${capability}/${targetId}`);

  return response.data;
}
