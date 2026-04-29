import type {
  CreateRegionRoomRequest,
  RadarDistanceFilter,
  RadarRegion,
} from '@/types/radar';

export function buildRegionRoomRequest({
  region,
  title,
  description,
  distanceMeters,
}: {
  region: RadarRegion;
  title: string;
  description?: string;
  distanceMeters: RadarDistanceFilter;
}): CreateRegionRoomRequest {
  return {
    regionId: region.id,
    title,
    description,
    distanceMeters,
  };
}
