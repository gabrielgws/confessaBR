import { api } from '@/services/api';
import type {
  CreateReportRequest,
  ModerationAction,
  ModerationActionRequest,
  ModerationQueueItem,
  Report,
} from '@/types/moderation';

export async function createReport(payload: CreateReportRequest): Promise<Report> {
  const response = await api.post<Report>('/reports', payload);

  return response.data;
}

export async function getModerationQueue(): Promise<ModerationQueueItem[]> {
  const response = await api.get<ModerationQueueItem[]>('/moderation/queue');

  return response.data;
}

export async function createModerationAction(
  payload: ModerationActionRequest,
): Promise<ModerationAction> {
  const response = await api.post<ModerationAction>('/moderation/actions', payload);

  return response.data;
}
