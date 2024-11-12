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
import { onSnapshot, collection, doc, getDoc, getDocs } from 'firebase/firestore';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchPosts() {
    try {
      const unsubscribe = onSnapshot(collection(db, 'posts'), async (postsSnapshot) => {
        if (postsSnapshot.empty) {
          console.log("No posts found in the 'posts' collection.");
          return;
        }
        // Process each post document and fetch user info
        const postsWithUserInfo = await Promise.all(
          postsSnapshot.docs.map(async (postDoc) => {
            if (!postDoc.exists) {
              console.warn(`Post document does not exist: ${postDoc.id}`);
              return null;
            }

            const postData = postDoc.data();

            if (!postData.owner) {
              console.warn(`User ID is missing in post document: ${postDoc.id}`);
              return { postId: postDoc.id, ...postData, user: null };
            }

            const userId = postData.owner;
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : null;
            return {
              postId: postDoc.id,
              ...postData,
              userImage: userData?.profileImage,
              userName: userData?.displayName,
            };
          })
        );
        const sortedPosts = postsWithUserInfo
          .filter((post) => post !== null)
          .sort((a, b) => b.createdDate - a.createdDate);

        setPosts(sortedPosts);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching posts and user information:', error);
      throw new Error('Failed to fetch posts and user information');
    }
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