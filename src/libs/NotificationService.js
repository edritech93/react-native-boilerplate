import {NOTIF_CHANNEL_TRANSACTION} from '../constants';
import notifee, {TriggerType} from '@notifee/react-native';

const SCHEDULE_ID = '2147483';

export async function showLocalNotification(title, description) {
  await notifee.displayNotification({
    title: title,
    body: description,
    android: {
      channelId: NOTIF_CHANNEL_TRANSACTION.id,
      ...NOTIF_CHANNEL_TRANSACTION,
    },
    ios: {
      ...NOTIF_CHANNEL_TRANSACTION,
    },
  });
}

export async function setupScheduledNotification(
  title,
  description,
  notificationDate,
) {
  await notifee.cancelNotification(SCHEDULE_ID);
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: notificationDate.valueOf(),
  };
  await notifee.createTriggerNotification(
    {
      id: SCHEDULE_ID,
      title: title,
      body: description,
      android: {
        channelId: NOTIF_CHANNEL_TRANSACTION.id,
        ...NOTIF_CHANNEL_TRANSACTION,
      },
      ios: {
        ...NOTIF_CHANNEL_TRANSACTION,
      },
    },
    trigger,
  );
}

export async function cancelScheduleNotification() {
  await notifee.cancelNotification(SCHEDULE_ID);
}
