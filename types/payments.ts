export type PaidCapability = 'sender_reveal';
export type PaymentTargetType = 'anonymous_message';
export type PaymentStatus = 'created' | 'pending' | 'confirmed' | 'failed' | 'expired';

export type PaymentCapability = {
  capability: PaidCapability;
  targetId: string;
  unlocked: boolean;
  status?: PaymentStatus;
};
