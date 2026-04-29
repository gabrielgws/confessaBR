export type ReportTargetType = 'message' | 'room_feed_item' | 'poll' | 'user';

export type CreateReportRequest = {
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  roomId?: string;
};
