import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigator';
// import { setDoc, doc } from 'firebase/firestore';
// import { db } from './src/services/firebaseSetup';

const Tab = createBottomTabNavigator();

export default function App() {
  // useEffect(() => {
  //   const addDummyUser = async () => {
  //     try {
  //       await setDoc(doc(db, 'users', 'DummyUserId'), {
  //         displayName: 'John Doe',
  //         email: 'john@example.com',
  //         bio: 'Food enthusiast and amateur chef 🍳',
  //         profileImage: 'https://placedog.net/301/301',
  //         postsCount: 42,
  //         followersCount: 0,
  //         followingCount: 0,
  //       });
  //       console.log('Dummy user added to the database with custom ID');
  //     } catch (error) {
  //       console.error('Error adding dummy user: ', error);
  //     }
  //   };
  //   addDummyUser();
  // }
  //   , []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
