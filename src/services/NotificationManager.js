import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleEventNotification = async (event) => {
  try {
    // Cancel any existing notifications for this event
    await cancelEventNotification(event.id);

    // Set notification for 9 AM on the event day
    const trigger = new Date(event.date);
    trigger.setHours(9, 0, 0, 0);

    // Don't schedule if the date is in the past
    if (trigger <= new Date()) {
      console.log('Skipping notification for past event:', event.title);
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Event Reminder',
        body: `Don't forget: ${event.title} today at ${event.location}!`,
        data: { eventId: event.id },
      },
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

export const cancelEventNotification = async (eventId) => {
  try {
    // Get all scheduled notifications
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    
    // Find and cancel notifications for this event
    for (const notification of scheduledNotifications) {
      if (notification.content.data.eventId === eventId) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    }
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};