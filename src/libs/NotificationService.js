import PushNotification from 'react-native-push-notification';
import {Colors} from '../themes';
let lastId = 0;

function showLocalNotification(title, description, data) {
  lastId++;

  let notificationData = data;

  if (typeof data === 'string') {
    notificationData = JSON.parse(data);
  }

  PushNotification.localNotification({
    /* Android Only Properties */
    id: lastId,
    autoCancel: true,
    vibrate: true,
    tag: 'Boilerplate',
    group: 'Boilerplate',
    ongoing: false,
    bigText: description,
    smallIcon: 'ic_notification',
    color: Colors.primary,
    channelId: 'notification_channel',

    /* iOS only properties */
    alertAction: 'view',
    category: 'Boilerplate',
    userInfo: notificationData ? notificationData : {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

    /* iOS and Android properties */
    title: title,
    message: description,
    playSound: true,
    soundName: 'default',
    data: data,
  });
}

function checkPermission(cbk) {
  return PushNotification.checkPermissions(cbk);
}

function requestPermissions() {
  return PushNotification.requestPermissions();
}

function cancelNotif() {
  PushNotification.cancelLocalNotifications({id: '' + this.lastId});
}

function cancelAll() {
  PushNotification.cancelAllLocalNotifications();
}

function abandonPermissions() {
  PushNotification.abandonPermissions();
}

export default {
  showLocalNotification,
  checkPermission,
  requestPermissions,
  cancelNotif,
  cancelAll,
  abandonPermissions,
};
