import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { writeEventToDB, updateEventToDB } from '../services/firebaseHelper';
import { auth, db } from '../services/firebaseSetup';
import { query, collection, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const NewEventScreen = ({ navigation, route }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date(),
    reminder: true,
  });

  useEffect(() => {
    if (route.params?.event) {
      navigation.setOptions({ title: 'Edit Event' });
      setEventData(route.params.event)
    }
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!eventData.title || !eventData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      if (route.params?.event) {
        await updateEventToDB(route.params.event.id, { ...eventData, owner: auth.currentUser.uid, userName: "John"});
        Alert.alert('Success', 'Event updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await writeEventToDB({ ...eventData, owner: auth.currentUser.uid, userName: "John"});

        // Count all events by the user
        const eventsQuery = query(
          collection(db, 'events'),
          where('owner', '==', auth.currentUser.uid)
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const totalEvents = eventsSnapshot.size;
        // Update user's eventsCount with actual count
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          eventsCount: totalEvents,
        });

        Alert.alert('Success', 'Event created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Event Title *</Text>
        <TextInput
          style={styles.input}
          value={eventData.title}
          onChangeText={(text) => setEventData(prev => ({ ...prev, title: text }))}
          placeholder="Enter event title"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          value={eventData.location}
          onChangeText={(text) => setEventData(prev => ({ ...prev, location: text }))}
          placeholder="Enter event location"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={eventData.description}
          onChangeText={(text) => setEventData(prev => ({ ...prev, description: text }))}
          placeholder="Enter event description"
          multiline
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{eventData.date.toLocaleDateString()}</Text>
          <Ionicons name="calendar-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={eventData.date}
          mode="datetime"
          display="default"
          is24Hour={true}
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewEventScreen; 