import { ActivityIndicator, Text, View } from 'react-native';

type StateViewProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function LoadingState({ title = 'Carregando' }: Partial<StateViewProps>) {
  return (
    <View className="items-center justify-center gap-3 p-6">
      <ActivityIndicator />
      <Text className="text-center text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </Text>
    </View>
  );
}

export function ErrorState({ title, description, action }: StateViewProps) {
  return (
    <View className="items-center justify-center gap-3 p-6">
      <Text className="text-center text-base font-semibold text-red-700 dark:text-red-300">
        {title}
      </Text>
      {description ? (
        <Text className="text-center text-sm text-zinc-600 dark:text-zinc-300">{description}</Text>
      ) : null}
      {action}
    </View>
  );
}

export function EmptyState({ title, description, action }: StateViewProps) {
  return (
    <View className="items-center justify-center gap-3 p-6">
      <Text className="text-center text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </Text>
      {description ? (
        <Text className="text-center text-sm text-zinc-600 dark:text-zinc-300">{description}</Text>
      ) : null}
      {action}
    </View>
  );
}

export function SuccessState({ title, description, action }: StateViewProps) {
  return (
    <View className="items-center justify-center gap-3 p-6">
      <Text className="text-center text-base font-semibold text-emerald-700 dark:text-emerald-300">
        {title}
      </Text>
      {description ? (
        <Text className="text-center text-sm text-zinc-600 dark:text-zinc-300">{description}</Text>
      ) : null}
      {action}
    </View>
  );
}
