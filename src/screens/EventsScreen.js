import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import EventCard from '../components/EventCard';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // TODO: Fetch events from Firebase
    // For now, using dummy data
    setEvents([
      {
        id: '1',
        title: 'Food Festival',
        description: 'Annual street food festival',
        date: new Date('2024-10-15'),
        location: 'Central Park',
        reminder: true,
      },
      // Add more dummy events
    ]);
  }, []);

  const scheduleNotification = async (event) => {
    const trigger = new Date(event.date);
    trigger.setHours(9); // Notify at 9 AM on event day
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Event Reminder',
        body: `Don't forget: ${event.title} today!`,
        data: { eventId: event.id },
      },
      trigger,
    });
  };

  const handleAddEvent = () => {
    navigation.navigate('NewEvent');
  };

  const handleDeleteEvent = async (eventId) => {
    // TODO: Delete from Firebase
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleEditEvent = (event) => {
    navigation.navigate('EditEvent', { event });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onDelete={() => handleDeleteEvent(item.id)}
            onEdit={() => handleEditEvent(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 20,
    margin: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    padding: 15,
  },
});

export default EventsScreen; 