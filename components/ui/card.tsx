import { View, type ViewProps } from 'react-native';

export function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={`rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 ${
        className ?? ''
      }`}
      {...props}
    />
  );
}
