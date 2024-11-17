import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // After getting location, fetch nearby restaurants
      fetchNearbyRestaurants(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    }
  };

  const fetchNearbyRestaurants = async (latitude, longitude) => {
    try {
      if (!GOOGLE_PLACES_API_KEY) {
        throw new Error('Google Places API key is not configured');
      }

      

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const restaurants = data.results.map(place => ({
          id: place.place_id,
          name: place.name,
          coordinate: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          rating: place.rating,
          address: place.vicinity,
          isOpen: place.opening_hours?.open_now,
        }));
       
        setNearbyRestaurants(restaurants);
      } else {
        throw new Error(`API returned status: ${data.status}`);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch nearby restaurants');
    }
  };

  const handleMarkerPress = (restaurant) => {
    setSelectedMarker(restaurant);
  };

  const handleAddPost = (restaurant) => {
    navigation.navigate('Post', {
      screen: 'NewPost',
      params: { restaurant },
    });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {/* User location marker */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="blue"
            title="You are here"
          />

          {/* Restaurant markers */}
          {nearbyRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={restaurant.coordinate}
              pinColor="red"
              onPress={() => handleMarkerPress(restaurant)}
            >
              <Callout onPress={() => handleAddPost(restaurant)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                  <Text>Rating: {restaurant.rating} ⭐</Text>
                  <Text>{restaurant.address}</Text>
                  <Text style={styles.calloutStatus}>
                    {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
                  </Text>
                  <Text style={styles.calloutAction}>Tap to create post</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      {/* Add button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddPost()}
      >
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      {/* Refresh button */}
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={getCurrentLocation}
      >
        <Ionicons name="refresh" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calloutStatus: {
    marginTop: 5,
    fontWeight: '500',
  },
  calloutAction: {
    marginTop: 5,
    color: '#FF6B6B',
    fontStyle: 'italic',
  },
});

export default MapScreen; 