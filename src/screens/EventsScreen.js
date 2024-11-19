import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import EventCard from '../components/EventCard';
import { db } from '../services/firebaseSetup';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { deleteEventFromDB } from '../services/firebaseHelper';
import { auth } from '../services/firebaseSetup';

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
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const q = query(collection(db, 'events'), where('owner', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let eventsArray = [];
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        eventsArray.push({
          id: docSnapshot.id,
          title: data.title,
          description: data.description,
          date: data.date.toDate(),
          location: data.location,
          reminder: true});
      });
      const sortedEvents = eventsArray
          .sort((a, b) => a.date - b.date);
      setEvents(sortedEvents);
    },
    (error) => {
      console.log("Error in onSnapshot: ", error);
      Alert.alert(error.message);
    });
    return () => unsubscribe()
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
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteEventFromDB(eventId);
            setEvents(events.filter(event => event.id !== eventId));
          }
        }
      ],
      { cancelable: false }
    )
  };

  const handleEditEvent = (event) => {
    navigation.navigate('NewEvent', {event});
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
        keyExtractor={(item, index) => {
          return item.id;
        }}
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