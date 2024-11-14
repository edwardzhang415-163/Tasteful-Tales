import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { writePostToDB } from '../services/firebaseHelper';

const PostScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(route.params?.image || null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: route.params?.placeName || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      };

      const result = await new Promise((resolve, reject) => {
        Alert.alert(
          'Select Image',
          'Choose an option',
          [
            {
              text: 'Camera',
              onPress: async () => {
                try {
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

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
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
      await writePostToDB({ ...formData, owner: "DummyUserId", userImage: "https://placedog.net/301/301", userName: "John"}, image, "posts");
      Alert.alert('Success', 'Post created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Feed') }
      ]);
    } catch (error) {
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
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={formData.location}
            onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            multiline
          />
          <TouchableOpacity 
            style={[styles.postButton, isLoading && styles.disabledButton]}
            onPress={handlePost}
            disabled={isLoading}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  imageSection: {
    marginBottom: 20,
    alignItems: 'center',
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
    width: '100%',
    height: 300,
    borderRadius: 10,
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostScreen;