import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import FeedCard from '../components/FeedCard';
import { navigateToPost } from '../navigation/navigationUtils';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    // TODO: Implement Firebase fetch
    const dummyPosts = [
      {
        id: '1',
        userName: 'FoodLover',
        userImage: 'https://placekitten.com/100/100',
        image: 'https://placekitten.com/400/400',
        caption: 'Delicious homemade pasta!',
        placeName: 'Home Kitchen',
        likes: 42,
      },
      {
        id: '2', 
        userName: 'TravelBug',
        userImage: 'https://placekitten.com/101/101',
        image: 'https://placekitten.com/401/401',
        caption: 'Beautiful sunset at the beach!',
        placeName: 'Paradise Beach',
        likes: 128,
      },
      {
        id: '3',
        userName: 'ArtLover',
        userImage: 'https://placekitten.com/102/102', 
        image: 'https://placekitten.com/402/402',
        caption: 'My latest painting',
        placeName: 'Art Studio',
        likes: 89,
      }
    ];
    
    setPosts(dummyPosts);
    setLoading(false);
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