import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import FeedCard from '../components/FeedCard';
import { navigateToPost } from '../navigation/navigationUtils';
import { db } from '../services/firebaseSetup';
import {onSnapshot, collection} from 'firebase/firestore';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      let postsArray = [];
      snapshot.forEach((docSnapshot) => {
        postsArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
      });
      setPosts(postsArray);
    },
    (error) => {
      console.log("Error in onSnapshot: ", error);
      Alert.alert(error.message);
    });
    setLoading(false);

    return () => unsubscribe()
    // const dummyPosts = [
    //   {
    //     id: '1',
    //     userName: 'FoodLover',
    //     userImage: 'https://placekitten.com/300/300',
    //     image: 'https://placekitten.com/300/300',
    //     caption: 'Delicious homemade pasta!',
    //     placeName: 'Home Kitchen',
    //     likes: 42,
    //   },
    //   {
    //     id: '2', 
    //     userName: 'TravelBug',
    //     userImage: 'https://placedog.net/301/301',
    //     image: 'https://foodish-api.herokuapp.com/images/burger/burger1.jpg',
    //     caption: 'Beautiful sunset at the beach!',
    //     placeName: 'Paradise Beach',
    //     likes: 128,
    //   },
    //   {
    //     id: '3',
    //     userName: 'ArtLover',
    //     userImage: 'https://placedog.net/302/302', 
    //     image: 'https://foodish-api.herokuapp.com/images/pizza/pizza1.jpg',
    //     caption: 'My latest painting',
    //     placeName: 'Art Studio',
    //     likes: 89,
    //   }
    // ];
    // setPosts(dummyPosts);

  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handlePostPress = (post) => {
    navigateToPost(navigation, { post });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <FeedCard 
            post={item} 
            onPress={() => handlePostPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 15,
  },
});

export default FeedScreen; 