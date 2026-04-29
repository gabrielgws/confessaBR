import { api } from '@/services/api';
import type {
  AnonymousMessage,
  ReportMessageRequest,
  RevealSenderResponse,
  SafeSharePayload,
  SendAnonymousMessageRequest,
} from '@/types/inbox';

export async function listMessages(): Promise<AnonymousMessage[]> {
  const response = await api.get<AnonymousMessage[]>('/inbox/messages');

  return response.data;
}

export async function getMessage(messageId: string): Promise<AnonymousMessage> {
  const response = await api.get<AnonymousMessage>(`/inbox/messages/${messageId}`);

  return response.data;
}

export async function archiveMessage(messageId: string): Promise<AnonymousMessage> {
  const response = await api.post<AnonymousMessage>(`/inbox/messages/${messageId}/archive`);

  return response.data;
}

export async function reportMessage(messageId: string, payload: ReportMessageRequest): Promise<void> {
  await api.post(`/inbox/messages/${messageId}/report`, payload);
}

export async function getSharePayload(messageId: string): Promise<SafeSharePayload> {
  const response = await api.get<SafeSharePayload>(`/inbox/messages/${messageId}/share`);

  return response.data;
}

export async function sendMessage(payload: SendAnonymousMessageRequest): Promise<AnonymousMessage> {
  const response = await api.post<AnonymousMessage>('/messages', payload);

  return response.data;
}

export async function revealSender(messageId: string): Promise<RevealSenderResponse> {
  const response = await api.post<RevealSenderResponse>(`/inbox/messages/${messageId}/reveal`);

  return response.data;
}
