import { Text, TextInput, View, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <View className="gap-2">
      {label ? (
        <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{label}</Text>
      ) : null}
      <TextInput
        className={`min-h-12 rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 ${
          error ? 'border-red-500' : ''
        } ${className ?? ''}`}
        placeholderTextColor="#71717A"
        {...props}
      />
      {error ? <Text className="text-sm text-red-600 dark:text-red-300">{error}</Text> : null}
    </View>
  );
}
