export type PaidCapability = 'sender_reveal';
export type PaymentTargetType = 'anonymous_message';
export type PaymentStatus = 'created' | 'pending' | 'confirmed' | 'failed' | 'expired' | 'cancelled';

export type PaymentCapability = {
  capability: PaidCapability;
  targetId: string;
  unlocked: boolean;
  status?: PaymentStatus;
};

export type Payment = {
  id: string;
  payerId: string;
  capability: PaidCapability;
  targetType: PaymentTargetType;
  targetId: string;
  status: PaymentStatus;
  checkoutUrl?: string | null;
  confirmedAt?: string | null;
  createdAt: string;
};

export type CreatePaymentRequest = {
  capability: PaidCapability;
  targetType: PaymentTargetType;
  targetId: string;
};
