import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({
    displayName: 'John Doe',
    email: 'john@example.com',
    bio: 'Food enthusiast and amateur chef 🍳',
    profileImage: 'https://placekitten.com/200/200',
    postsCount: 42,
    followersCount: 1234,
    followingCount: 567,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [userPosts, setUserPosts] = useState([
    // Dummy data
    { id: 1, imageUrl: 'https://placekitten.com/300/300' },
    { id: 2, imageUrl: 'https://placekitten.com/301/301' },
    { id: 3, imageUrl: 'https://placekitten.com/302/302' },
    // Add more dummy posts
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Fetch updated profile data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon!');
  };

  const handleChangeProfilePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // TODO: Upload image to Firebase Storage
        setUserProfile(prev => ({
          ...prev,
          profileImage: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.profileImageContainer}
          onPress={handleChangeProfilePicture}
        >
          <Image
            source={{ uri: userProfile.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.displayName}>{userProfile.displayName}</Text>
        <Text style={styles.bio}>{userProfile.bio}</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.postsGrid}>
        {userPosts.map((post) => (
          <TouchableOpacity 
            key={post.id} 
            style={styles.postThumbnail}
          >
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.postImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
  },
  bioSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  postThumbnail: {
    width: '33.33%',
    padding: 2,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default ProfileScreen; 