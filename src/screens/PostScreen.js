import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { writePostToDB } from '../services/firebaseHelper';
import { auth, db } from '../services/firebaseSetup'; 
import { doc, updateDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { COLORS, LAYOUT, TYPOGRAPHY, COMMON_STYLES, IMAGE_DIMENSIONS } from '../utils/styleHelper';


const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const PostScreen = ({ navigation, route }) => {
  // Format restaurant info helper function
  const formatRestaurantInfo = (restaurant) => {
    if (!restaurant) return '';
    const { name, address } = restaurant;
    return `📍 ${name}, ${address}`;
  };
  
  const [image, setImage] = useState(route.params?.image || null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',  
  });
  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const restaurant = route.params?.restaurant;
    if (restaurant) {
      setFormData(prev => ({
        ...prev,
        location: formatRestaurantInfo(restaurant)
      }));
    }
  }, [route.params?.restaurant]);

  useEffect(() => {
    checkPermissions();
  }, []);
  
  const checkPermissions = async () => {
    try {
      // Request camera permission
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera access is required to take photos.',
          [{ text: 'OK' }]
        );
      }

      // Request photo library permission
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryPermission.status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Photo library access is required to select photos.',
          [{ text: 'OK' }]
        );
      }

      // Request location permission
      const locationPermission = await Location.requestForegroundPermissionsAsync();
      if (locationPermission.status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location access is required for weather information.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  // Function to get current location and weather
  const getCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get location details using reverse geocoding
      const [locationDetails] = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      // Validate API key
      if (!WEATHER_API_KEY) {
        throw new Error('Weather API key is not configured');
      }

      // Get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error('Weather API request failed');
      }

      const weatherData = await weatherResponse.json();

      // Format location and weather string
      const locationString = formatLocationString(locationDetails, weatherData);
      
      // Update form data with location string
      setFormData(prev => ({
        ...prev,
        location: locationString
      }));

    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', error.message || 'Failed to get location information');
    } finally {
      setLocationLoading(false);
    }
  };

  // Helper function to format location string
  const formatLocationString = (locationDetails, weatherData) => {
    const city = locationDetails.city || locationDetails.district || locationDetails.subregion;
    const temperature = Math.round(weatherData.main.temp);
    const weather = weatherData.weather[0].main;
    
    return `📍 ${city} • ${temperature}°C • ${weather}`;
  };

  // Handle image selection from camera or library
  const pickImage = async () => {
    try {
      // Check current permission status
      const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

      // Configure image picker options
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Adjust quality for better performance
      };

      // Show action sheet for image source selection
      const result = await new Promise((resolve, reject) => {
        Alert.alert(
          'Select Image',
          'Choose an option',
          [
            {
              text: 'Camera',
              onPress: async () => {
                try {
                  // Verify camera permission before proceeding
                  if (!cameraPermission.granted) {
                    const newPermission = await ImagePicker.requestCameraPermissionsAsync();
                    if (!newPermission.granted) {
                      Alert.alert('Permission Required', 'Camera access is required to take photos.');
                      return;
                    }
                  }
                  // Launch camera if permission granted
                  const cameraResult = await ImagePicker.launchCameraAsync(options);
                  resolve(cameraResult);
                } catch (error) {
                  reject(error);
                }
              },
            },
            {
              text: 'Library',
              onPress: async () => {
                try {
                  // Verify library permission before proceeding
                  if (!libraryPermission.granted) {
                    const newPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (!newPermission.granted) {
                      Alert.alert('Permission Required', 'Photo library access is required to select photos.');
                      return;
                    }
                  }
                  // Launch photo library if permission granted
                  const libraryResult = await ImagePicker.launchImageLibraryAsync(options);
                  resolve(libraryResult);
                } catch (error) {
                  reject(error);
                }
              },
            },
            {
              text: 'Cancel',
              onPress: () => resolve({ canceled: true }),
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
      });

      // Update state with selected image if not canceled
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  const handlePost = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select a photo');
      return;
    }

    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    setIsLoading(true);

    try {
      await writePostToDB({ ...formData, owner: auth.currentUser.uid}, image, "posts");

      // Count all posts by the user
      const postsQuery = query(
        collection(db, 'posts'),
        where('owner', '==', auth.currentUser.uid)
      );
      const postsSnapshot = await getDocs(postsQuery);
      const totalPosts = postsSnapshot.size;
      // Update user's postsCount with actual count
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        postsCount: totalPosts,
      });

      Alert.alert('Success', 'Post created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Feed') }
      ]);
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setFormData({ title: '', description: '', location: '' });
      setImage(null);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            {/* Image Preview Section */}
            <View style={styles.imageSection}>
              {image ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.changeImageButton}
                    onPress={() => setImage(null)}>
                    <Ionicons name="close-circle" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.imageButton} 
                  onPress={pickImage}
                >
                  <Ionicons name="images" size={32} color="#FF6B6B" />
                  <Text style={styles.imageButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={formData.title}
                onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              />
              
              {/* Modified Location Input */}
              <View style={styles.locationInputContainer}>
                <TextInput
                  style={[styles.input, styles.locationInput]}
                  placeholder={formData.location ? formData.location : "Location and Weather"}
                  value={formData.location}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
                />
                <TouchableOpacity 
                  style={styles.locationButton}
                  onPress={getCurrentLocation}
                  disabled={locationLoading}
                >
                  <Ionicons 
                    name="location" 
                    size={24} 
                    color={locationLoading ? "#999" : "#FF6B6B"} 
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                multiline
              />
              
              <TouchableOpacity 
                style={[styles.postButton, (isLoading || locationLoading) && styles.disabledButton]}
                onPress={handlePost}
                disabled={isLoading || locationLoading}
              >
                <Text style={styles.postButtonText}>
                  {isLoading ? 'Posting...' : 'Post'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: COMMON_STYLES.container,
  content: {
    padding: LAYOUT.padding.xl
  },
  imageSection: {
    marginBottom: LAYOUT.padding.xl,
    alignItems: 'center'
  },
  imageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '100%',
  },
  imageButtonText: {
    marginTop: 8,
    color: '#666',
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '100%',
  },
  imagePreview: {
    ...IMAGE_DIMENSIONS.preview,
    borderRadius: LAYOUT.borderRadius.md
  },
  changeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  formSection: {
    gap: 15,
  },
  input: {
    ...COMMON_STYLES.input,
    marginBottom: LAYOUT.padding.md
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  postButton: {
    ...COMMON_STYLES.button.primary,
    marginTop: LAYOUT.padding.lg
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: COLORS.text.light,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.bold
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationInput: {
    flex: 1,
  },
  locationButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
});

export default PostScreen;