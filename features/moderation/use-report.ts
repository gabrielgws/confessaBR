import { useMutation } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as moderationService from '@/services/moderation.service';
import type { CreateReportRequest } from '@/types/moderation';

export function useReport() {
  const mutation = useMutation({
    mutationFn: moderationService.createReport,
  });

  return {
    submitReport: (payload: CreateReportRequest) => mutation.mutateAsync(payload),
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    report: mutation.data,
    error: mutation.error ? normalizeApiError(mutation.error) : null,
  };
}
