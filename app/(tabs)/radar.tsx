import { Link, router } from 'expo-router';
import type { Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Badge, Button, Card, EmptyState, ErrorState, Header, LoadingState } from '@/components/ui';
import { buildRegionRoomRequest } from '@/features/radar/create-region-room';
import { useLocationPermission } from '@/features/radar/use-location-permission';
import { useRadar } from '@/features/radar/use-radar';
import { RadarMap } from '@/features/radar/radar-map';
import type { RadarDistanceFilter, RadarResult, RadarTypeFilter } from '@/types/radar';

const typeFilters: { label: string; value: RadarTypeFilter }[] = [
  { label: 'Tudo', value: 'all' },
  { label: 'Salas', value: 'room' },
  { label: 'Pessoas', value: 'people' },
  { label: 'Regioes', value: 'region_room' },
];

const distanceFilters: RadarDistanceFilter[] = [500, 1000, 3000, 5000, 10000];

export default function RadarScreen() {
  const radar = useRadar();
  const locationPermission = useLocationPermission();

  async function optIn() {
    const approximateLocation = await locationPermission.requestPermissionAndRegion();

    if (!approximateLocation) {
      return;
    }

    await radar.updatePresence({
      optedIn: true,
      distanceMeters: radar.filters.distanceMeters,
      latitude: approximateLocation.latitude,
      longitude: approximateLocation.longitude,
    });
  }

  async function optOut() {
    await radar.updatePresence({
      optedIn: false,
      distanceMeters: radar.filters.distanceMeters,
    });
  }

  if (radar.radarState.isLoading) {
    return <LoadingState title="Carregando radar" />;
  }

  if (radar.radarState.error) {
    return (
      <ErrorState
        title="Radar indisponivel"
        description={radar.radarState.error.message}
        action={<Button title="Tentar de novo" onPress={() => radar.radarState.refetch()} />}
      />
    );
  }

  const isOptedIn = radar.presence?.optedIn;

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-950" contentContainerClassName="p-4">
      <Header
        title="Radar"
        subtitle="Bairros, regioes e salas por perto"
        action={{ label: 'Notificacoes', onPress: () => router.push('/(modals)/notifications' as Href) }}
      />
      <View className="gap-4">
        <Card className="gap-3">
          <View className="flex-row items-center justify-between gap-3">
            <Badge label={isOptedIn ? 'Ativo' : 'Desativado'} variant={isOptedIn ? 'success' : 'neutral'} />
            <Text className="text-xs text-zinc-500 dark:text-zinc-400">
              {radar.filters.distanceMeters / 1000} km
            </Text>
          </View>
          <Text className="text-sm leading-5 text-zinc-600 dark:text-zinc-300">
            O radar mostra apenas areas aproximadas e contagens agregadas.
          </Text>
          <Button
            title={isOptedIn ? 'Sair do radar' : 'Entrar no radar'}
            variant={isOptedIn ? 'ghost' : 'primary'}
            disabled={radar.presenceState.isPending || locationPermission.isResolvingLocation}
            onPress={isOptedIn ? optOut : optIn}
          />
          {locationPermission.permissionState === 'denied' ? (
            <Text className="text-sm text-red-700 dark:text-red-300">
              Permissao de localizacao negada. Ative nas configuracoes do aparelho para usar o radar.
            </Text>
          ) : null}
        </Card>

        <Card className="gap-3">
          <Text className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Tipo</Text>
          <View className="flex-row flex-wrap gap-2">
            {typeFilters.map((filter) => (
              <Button
                key={filter.value}
                title={filter.label}
                variant={radar.filters.type === filter.value ? 'primary' : 'ghost'}
                className="min-h-10"
                onPress={() => radar.setTypeFilter(filter.value)}
              />
            ))}
          </View>
          <Text className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Distancia</Text>
          <View className="flex-row flex-wrap gap-2">
            {distanceFilters.map((distance) => (
              <Button
                key={distance}
                title={distance >= 1000 ? `${distance / 1000} km` : `${distance} m`}
                variant={radar.filters.distanceMeters === distance ? 'primary' : 'ghost'}
                className="min-h-10"
                onPress={() => radar.setDistanceFilter(distance)}
              />
            ))}
          </View>
        </Card>

        {radar.results.length > 0 ? <RadarMap results={radar.results} /> : null}

        {radar.results.length === 0 ? (
          <EmptyState
            title="Nada por perto ainda"
            description="Ajuste os filtros ou crie uma sala regional."
          />
        ) : (
          radar.results.map((result) => (
            <RadarResultCard
              key={result.id}
              result={result}
              isCreatingRegionRoom={radar.regionRoomState.isPending}
              onCreateRegionRoom={() =>
                radar.createRegionRoom(
                  buildRegionRoomRequest({
                    region: result.region,
                    title: `Sala de ${result.region.name}`,
                    description: result.description ?? undefined,
                    distanceMeters: radar.filters.distanceMeters,
                  }),
                )
              }
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

function RadarResultCard({
  result,
  isCreatingRegionRoom,
  onCreateRegionRoom,
}: {
  result: RadarResult;
  isCreatingRegionRoom: boolean;
  onCreateRegionRoom: () => Promise<unknown>;
}) {
  const proximityHref = {
    pathname: '/(modals)/proximity-chat',
    params: {
      regionId: result.region.id,
      distanceMeters: String(Math.min(Math.max(result.distanceMeters, 500), 10000)),
      topic: result.title,
    },
  } as unknown as Href;

  return (
    <Card className="gap-3">
      <Badge
        label={result.type === 'people' ? 'Pessoas agregadas' : result.type === 'room' ? 'Sala' : 'Sala regional'}
        variant={result.type === 'people' ? 'success' : 'neutral'}
      />
      <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{result.title}</Text>
      <Text className="text-sm leading-5 text-zinc-600 dark:text-zinc-300">
        {result.description ?? result.region.name}
      </Text>
      <Text className="text-xs text-zinc-500 dark:text-zinc-400">
        {result.region.name} · {Math.round(result.distanceMeters)} m · {result.peopleCount ?? 0} pessoas
      </Text>
      <View className="gap-2">
        <Button
          title="Criar sala regional"
          variant="ghost"
          disabled={isCreatingRegionRoom}
          onPress={() => void onCreateRegionRoom()}
        />
        <Link href={proximityHref} asChild>
          <Button title="Chat temporario" variant="secondary" />
        </Link>
      </View>
    </Card>
  );
}
