import { Image, Text, View } from 'react-native';

type AvatarProps = {
  name: string;
  uri?: string | null;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClassNames = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export function Avatar({ name, uri, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (uri) {
    return <Image source={{ uri }} className={`${sizeClassNames[size]} rounded-full`} />;
  }

  return (
    <View
      className={`${sizeClassNames[size]} items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900`}>
      <Text className="font-semibold text-teal-800 dark:text-teal-100">{initials}</Text>
    </View>
  );
}
