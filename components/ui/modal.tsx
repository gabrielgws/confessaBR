import { Modal as NativeModal, Pressable, Text, View, type ModalProps as NativeModalProps } from 'react-native';

type ModalProps = NativeModalProps & {
  title?: string;
  onDismiss: () => void;
};

export function Modal({ title, onDismiss, children, transparent = true, animationType = 'fade', ...props }: ModalProps) {
  return (
    <NativeModal transparent={transparent} animationType={animationType} onRequestClose={onDismiss} {...props}>
      <View className="flex-1 justify-end bg-black/40">
        <Pressable className="absolute inset-0" accessibilityRole="button" onPress={onDismiss} />
        <View className="rounded-t-2xl bg-white p-5 dark:bg-zinc-950">
          {title ? (
            <Text className="mb-4 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{title}</Text>
          ) : null}
          {children}
        </View>
      </View>
    </NativeModal>
  );
}
