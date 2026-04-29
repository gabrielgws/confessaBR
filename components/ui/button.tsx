import { Pressable, Text, type PressableProps } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-teal-700 active:bg-teal-800',
  secondary: 'bg-zinc-900 active:bg-zinc-950 dark:bg-zinc-100 dark:active:bg-white',
  danger: 'bg-red-700 active:bg-red-800',
  ghost: 'bg-transparent active:bg-zinc-100 dark:active:bg-zinc-800',
};

const textClassNames: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white dark:text-zinc-950',
  danger: 'text-white',
  ghost: 'text-zinc-900 dark:text-zinc-50',
};

export function Button({ title, variant = 'primary', disabled, className, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className={`min-h-12 items-center justify-center rounded-lg px-4 ${variantClassNames[variant]} ${
        disabled ? 'opacity-50' : ''
      } ${className ?? ''}`}
      disabled={disabled}
      {...props}>
      <Text className={`text-base font-semibold ${textClassNames[variant]}`}>{title}</Text>
    </Pressable>
  );
}
