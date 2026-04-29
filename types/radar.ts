export type RadarResultType = 'room' | 'people' | 'region_room';

export type RadarDistanceFilter = 500 | 1000 | 3000 | 5000 | 10000;

export type RadarTypeFilter = 'all' | RadarResultType;

export type RadarRegion = {
  id: string;
  name: string;
  neighborhood?: string | null;
  city?: string | null;
  approximateLatitude: number;
  approximateLongitude: number;
  radiusMeters: number;
};

export type RadarPresence = {
  optedIn: boolean;
  region?: RadarRegion | null;
  distanceMeters: RadarDistanceFilter;
  updatedAt?: string | null;
};

export type UpdateRadarPresenceRequest = {
  optedIn: boolean;
  distanceMeters: RadarDistanceFilter;
  latitude?: number;
  longitude?: number;
};

export type RadarFilters = {
  type: RadarTypeFilter;
  distanceMeters: RadarDistanceFilter;
};

export type RadarResult = {
  id: string;
  type: RadarResultType;
  title: string;
  description?: string | null;
  region: RadarRegion;
  distanceMeters: number;
  peopleCount?: number;
  roomId?: string | null;
  roomSlug?: string | null;
};

export type RadarResponse = {
  presence: RadarPresence;
  results: RadarResult[];
  filters: RadarFilters;
};

export type CreateRegionRoomRequest = {
  regionId: string;
  title: string;
  description?: string;
  distanceMeters: RadarDistanceFilter;
};

export type RegionRoom = {
  id: string;
  title: string;
  description?: string | null;
  region: RadarRegion;
  memberCount: number;
  createdAt: string;
};

export type ProximityChatStatus = 'active' | 'expired' | 'closed';

export type ProximityChat = {
  id: string;
  title: string;
  region: RadarRegion;
  expiresAt: string;
  status: ProximityChatStatus;
  participantCount: number;
};

export type ProximityChatMessage = {
  id: string;
  chatId: string;
  anonymousAlias: string;
  body: string;
  createdAt: string;
};

export type StartProximityChatRequest = {
  regionId: string;
  distanceMeters: RadarDistanceFilter;
  topic?: string;
};

export type SendProximityChatMessageRequest = {
  body: string;
};
