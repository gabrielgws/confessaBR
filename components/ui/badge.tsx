import { Text, View } from 'react-native';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

const badgeClassNames: Record<BadgeVariant, string> = {
  neutral: 'bg-zinc-100 dark:bg-zinc-800',
  success: 'bg-emerald-100 dark:bg-emerald-900',
  warning: 'bg-amber-100 dark:bg-amber-900',
  danger: 'bg-red-100 dark:bg-red-900',
};

const textClassNames: Record<BadgeVariant, string> = {
  neutral: 'text-zinc-700 dark:text-zinc-200',
  success: 'text-emerald-800 dark:text-emerald-100',
  warning: 'text-amber-800 dark:text-amber-100',
  danger: 'text-red-800 dark:text-red-100',
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${badgeClassNames[variant]}`}>
      <Text className={`text-xs font-semibold ${textClassNames[variant]}`}>{label}</Text>
    </View>
  );
}
