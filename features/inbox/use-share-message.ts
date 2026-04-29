import { useMutation } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as inboxService from '@/services/inbox.service';
import type { AnonymousMessage } from '@/types/inbox';

import { assertSafeSharePayload, buildLocalSafeSharePayload } from './share-message';

export function useShareMessage(message?: AnonymousMessage) {
  const mutation = useMutation({
    mutationFn: async () => {
      if (!message) {
        return null;
      }

      const payload = await inboxService
        .getSharePayload(message.id)
        .catch(() => buildLocalSafeSharePayload(message));

      return assertSafeSharePayload(payload);
    },
  });

  return {
    getSafeSharePayload: () => mutation.mutateAsync(),
    isPending: mutation.isPending,
    error: mutation.error ? normalizeApiError(mutation.error) : null,
  };
}
