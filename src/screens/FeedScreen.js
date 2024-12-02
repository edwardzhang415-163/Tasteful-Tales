import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import FeedCard from '../components/FeedCard';
import { navigateToPost } from '../navigation/navigationUtils';
import { db, auth } from '../services/firebaseSetup';
import { onSnapshot, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import FeedSearchBar from '../components/FeedSearchBar';


const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = auth.currentUser;

  async function fetchPosts() {
    try {
      const unsubscribe = onSnapshot(collection(db, 'posts'), async (postsSnapshot) => {
        if (postsSnapshot.empty) {
          console.log("No posts found in the 'posts' collection.");
          setPosts([]);
          setLoading(false);
          return;
        }
        // Process each post document and fetch user info
        const postsWithUserInfo = await Promise.all(
          postsSnapshot.docs.map(async (postDoc) => {
            if (!postDoc.exists) {
              console.warn(`Post document does not exist: ${postDoc.id}`);
              setPosts([]);
              setLoading(false);
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

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);


  const onBlur = (searchText) => {
    setSearchQuery(searchText);
  };

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


  const welcomePost = {
    postId: 'welcome',
    title: 'Welcome to the Testful-Tales!',
    description:'Login now to explore and share your favorite local restaurants, cafes, and more!',
    image:  Image.resolveAssetSource(require('../../assets/icon.png')).uri,
    createdDate: new Date(),
    userImage: Image.resolveAssetSource(require('../../assets/icon.png')).uri,
    userName: 'Testful-Tales Team',
  }



  return (
    <View style={styles.container}>
      {user && <FeedSearchBar onBlur={onBlur} />}
      {!user && <FlatList
        data={[welcomePost, ...posts]}
        renderItem={({ item }) => (
          <FeedCard
            post={item}
            onPress={() => handlePostPress(item)}
          />
        )}
        keyExtractor={(item, index) => {
          return item.postId;
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.list}
      />}
      {user && <FlatList
        data={filteredPosts}
        renderItem={({ item }) => (
          <FeedCard
            post={item}
            onPress={() => handlePostPress(item)}
          />
        )}
        keyExtractor={(item, index) => {
          return item.postId;
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.list}
      />}
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
  iconImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default FeedScreen; 