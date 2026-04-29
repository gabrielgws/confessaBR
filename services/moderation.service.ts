import { api } from '@/services/api';
import type { CreateReportRequest } from '@/types/moderation';

export async function createReport(payload: CreateReportRequest): Promise<void> {
  await api.post('/reports', payload);
}
