import { api } from '@/services/api';
import type {
  CreateFeedItemRequest,
  CreateRoomRequest,
  JoinRoomRequest,
  Room,
  RoomFeedItem,
  RoomMembership,
} from '@/types/rooms';

export async function listRooms(): Promise<Room[]> {
  const response = await api.get<Room[]>('/rooms');

  return response.data;
}

export async function createRoom(payload: CreateRoomRequest): Promise<Room> {
  const response = await api.post<Room>('/rooms', payload);

  return response.data;
}

export async function joinRoom(payload: JoinRoomRequest): Promise<Room> {
  const response = await api.post<Room>('/rooms/join', payload);

  return response.data;
}

export async function leaveRoom(roomId: string): Promise<void> {
  await api.post(`/rooms/${roomId}/leave`);
}

export async function getRoomMembers(roomId: string): Promise<RoomMembership[]> {
  const response = await api.get<RoomMembership[]>(`/rooms/${roomId}/members`);

  return response.data;
}

export async function getRoomFeed(roomId: string): Promise<RoomFeedItem[]> {
  const response = await api.get<RoomFeedItem[]>(`/rooms/${roomId}/feed`);

  return response.data;
}

export async function createRoomFeedItem(
  roomId: string,
  payload: CreateFeedItemRequest,
): Promise<RoomFeedItem> {
  const response = await api.post<RoomFeedItem>(`/rooms/${roomId}/feed`, payload);

  return response.data;
}

export async function reportRoomFeedItem(
  roomId: string,
  feedItemId: string,
  reason: string,
): Promise<void> {
  await api.post(`/rooms/${roomId}/feed/${feedItemId}/report`, { reason });
}
