import notifee, {Trigger, TriggerType} from '@notifee/react-native';
import {CHANNEL_TRANSACTION} from '../constants';

const SCHEDULE_ID = '2147483';

export async function showLocalNotification(
  title: string | undefined,
  description: string | undefined,
  data?: any,
) {
  await notifee.displayNotification({
    title: title,
    body: description,
    android: {
      channelId: CHANNEL_TRANSACTION.id,
      ...CHANNEL_TRANSACTION,
    },
    ios: {
      ...CHANNEL_TRANSACTION,
    },
    data,
  });
}

export async function setupScheduledNotification(
  title: string,
  description: string,
  date: number,
) {
  await notifee.cancelNotification(SCHEDULE_ID);
  const trigger: Trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.valueOf(),
  };
  await notifee.createTriggerNotification(
    {
      id: SCHEDULE_ID,
      title: title,
      body: description,
      android: {
        channelId: CHANNEL_TRANSACTION.id,
        ...CHANNEL_TRANSACTION,
      },
      ios: {
        ...CHANNEL_TRANSACTION,
      },
    },
    trigger,
  );
}

export async function cancelScheduleNotification() {
  await notifee.cancelNotification(SCHEDULE_ID);
}
