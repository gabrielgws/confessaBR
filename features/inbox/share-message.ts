import type { AnonymousMessage, SafeSharePayload } from '@/types/inbox';

export function buildLocalSafeSharePayload(message: AnonymousMessage): SafeSharePayload {
  return {
    text: `"${message.body}"\n\nMensagem anonima recebida no ConfessaBR.`,
    attribution: 'ConfessaBR',
  };
}

export function assertSafeSharePayload(payload: SafeSharePayload): SafeSharePayload {
  return {
    text: payload.text,
    url: payload.url,
    attribution: 'ConfessaBR',
  };
}
