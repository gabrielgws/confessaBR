import MapView, { Circle, type Region } from 'react-native-maps';

import type { RadarResult } from '@/types/radar';

type RadarMapProps = {
  results: RadarResult[];
};

export function RadarMap({ results }: RadarMapProps) {
  const firstRegion = results[0]?.region;
  const initialRegion: Region = {
    latitude: firstRegion?.approximateLatitude ?? -23.55,
    longitude: firstRegion?.approximateLongitude ?? -46.63,
    latitudeDelta: 0.12,
    longitudeDelta: 0.12,
  };

  return (
    <MapView
      className="h-64 w-full overflow-hidden rounded-lg"
      initialRegion={initialRegion}
      scrollEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
      zoomEnabled={false}>
      {results.map((result) => (
        <Circle
          key={result.id}
          center={{
            latitude: result.region.approximateLatitude,
            longitude: result.region.approximateLongitude,
          }}
          radius={result.region.radiusMeters}
          fillColor={result.type === 'people' ? 'rgba(20, 184, 166, 0.18)' : 'rgba(14, 165, 233, 0.16)'}
          strokeColor={result.type === 'people' ? 'rgba(15, 118, 110, 0.7)' : 'rgba(2, 132, 199, 0.7)'}
          strokeWidth={2}
        />
      ))}
    </MapView>
  );
}
