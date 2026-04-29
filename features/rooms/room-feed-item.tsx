import { Text, View } from 'react-native';

import { Badge, Card } from '@/components/ui';
import type { RoomFeedItem } from '@/types/rooms';

type RoomFeedItemViewProps = {
  item: RoomFeedItem;
  action?: React.ReactNode;
};

export function RoomFeedItemView({ item, action }: RoomFeedItemViewProps) {
  return (
    <Card className="gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <Text className="font-semibold text-zinc-950 dark:text-zinc-50">{item.senderAlias}</Text>
        <Badge label="anonimo" />
      </View>
      <Text className="text-base leading-6 text-zinc-800 dark:text-zinc-100">{item.body}</Text>
      <Text className="text-xs text-zinc-500 dark:text-zinc-400">
        {new Date(item.createdAt).toLocaleString()}
      </Text>
      {action}
    </Card>
  );
}
