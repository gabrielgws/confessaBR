import type { ReportTargetType } from '@/types/moderation';

export type ReportTargetParams = {
  targetType: ReportTargetType;
  targetId: string;
  roomId?: string;
};

export function reportHref({ targetType, targetId, roomId }: ReportTargetParams) {
  return {
    pathname: '/(modals)/report',
    params: {
      targetType,
      targetId,
      ...(roomId ? { roomId } : {}),
    },
  };
}
