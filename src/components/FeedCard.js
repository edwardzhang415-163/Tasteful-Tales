import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeedCard = ({ post }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: post.userImage }} 
          style={styles.profileImage} 
        />
        <Text style={styles.username}>{post.userName}</Text>
      </View>
      
      <Image 
        source={{ uri: post.image }} 
        style={styles.mainImage} 
      />
      
      {/* <View style={styles.actions}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="location-outline" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      
      <View style={styles.content}>
        <Text style={styles.caption}>{post.title}</Text>
        <Text style={styles.location}>{post.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
    gap: 15,
  },
  content: {
    padding: 10,
  },
  caption: {
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
});

export default FeedCard; 