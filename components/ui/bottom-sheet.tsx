import { Pressable, Text, View } from 'react-native';

type BottomSheetProps = {
  open: boolean;
  title?: string;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function BottomSheet({ open, title, onOpenChange, children }: BottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <View className="absolute inset-0 justify-end bg-black/40">
      <Pressable className="absolute inset-0" accessibilityRole="button" onPress={() => onOpenChange(false)} />
      <View className="rounded-t-2xl bg-white p-5 dark:bg-zinc-950">
        {title ? (
          <Text className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{title}</Text>
        ) : null}
        {children}
      </View>
    </View>
  );
}
