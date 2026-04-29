import { Pressable, Text, View } from 'react-native';

type TabsProps<T extends string> = {
  value: T;
  values: T[];
  labels?: Partial<Record<T, string>>;
  onValueChange: (value: T) => void;
};

export function Tabs<T extends string>({ value, values, labels, onValueChange }: TabsProps<T>) {
  return (
    <View className="flex-row rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900">
      {values.map((item) => {
        const selected = item === value;

        return (
          <Pressable
            key={item}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className={`min-h-10 flex-1 items-center justify-center rounded-md px-3 ${
              selected ? 'bg-white dark:bg-zinc-800' : ''
            }`}
            onPress={() => onValueChange(item)}>
            <Text
              className={`text-sm font-semibold ${
                selected ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400'
              }`}>
              {labels?.[item] ?? item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
