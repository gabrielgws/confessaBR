import { Pressable, Text, View } from 'react-native';

export type HeaderAction = {
  label: string;
  onPress: () => void;
};

type HeaderProps = {
  title: string;
  subtitle?: string;
  action?: HeaderAction;
};

export function Header({ title, subtitle, action }: HeaderProps) {
  return (
    <View className="min-h-16 flex-row items-center justify-between gap-4 px-4 py-3">
      <View className="flex-1">
        <Text className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{subtitle}</Text> : null}
      </View>
      {action ? (
        <Pressable accessibilityRole="button" className="rounded-lg px-3 py-2 active:bg-zinc-100 dark:active:bg-zinc-800" onPress={action.onPress}>
          <Text className="text-sm font-semibold text-teal-700 dark:text-teal-300">{action.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
