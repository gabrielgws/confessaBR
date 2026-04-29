export type ReportTargetType = 'message' | 'room_feed_item' | 'poll' | 'user';
export type ReportStatus = 'submitted' | 'reviewing' | 'actioned' | 'dismissed';
export type ModerationActionType = 'hide' | 'remove' | 'block' | 'ban';

export type CreateReportRequest = {
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  roomId?: string;
};

export type Report = {
  id: string;
  targetType: ReportTargetType;
  targetId: string;
  reporterId: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  reviewedAt?: string | null;
};

export type ModerationQueueItem = {
  report: Report;
  targetPreview: string;
  roomId?: string;
  duplicateCount: number;
};

export type ModerationActionRequest = {
  targetType: ReportTargetType;
  targetId: string;
  actionType: ModerationActionType;
  reason: string;
  reportIds?: string[];
};

export type ModerationAction = {
  id: string;
  targetType: ReportTargetType;
  targetId: string;
  moderatorId: string;
  actionType: ModerationActionType;
  reason: string;
  createdAt: string;
};
