import * as Location from 'expo-location';
import { useCallback, useState } from 'react';

export type LocationPermissionState = 'granted' | 'denied' | 'undetermined';

export type ApproximateLocation = {
  latitude: number;
  longitude: number;
};

export function useLocationPermission() {
  const [permissionState, setPermissionState] =
    useState<LocationPermissionState>('undetermined');
  const [approximateLocation, setApproximateLocation] = useState<ApproximateLocation | null>(null);
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);

  const requestPermissionAndRegion = useCallback(async () => {
    setIsResolvingLocation(true);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== Location.PermissionStatus.GRANTED) {
        setPermissionState('denied');
        setApproximateLocation(null);
        return null;
      }

      setPermissionState('granted');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const approximate = {
        latitude: Number(location.coords.latitude.toFixed(2)),
        longitude: Number(location.coords.longitude.toFixed(2)),
      };

      setApproximateLocation(approximate);
      return approximate;
    } finally {
      setIsResolvingLocation(false);
    }
  }, []);

  return {
    permissionState,
    approximateLocation,
    isResolvingLocation,
    requestPermissionAndRegion,
  };
}
