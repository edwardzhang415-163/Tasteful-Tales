import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebaseSetup';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
// Import screens
import FeedScreen from '../screens/FeedScreen';
import MapScreen from '../screens/MapScreen';
import PostScreen from '../screens/PostScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NewEventScreen from '../screens/NewEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="PublicFeed" 
      component={FeedScreen}
      options={({ navigation }) => ({
        title: 'Tastful Tales',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#FF6B6B', fontSize: 16 }}>Login Now !</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// Individual stack navigators for each tab
const FeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="FeedHome" 
      component={FeedScreen}
      options={{ title: 'Feed' }}
    />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MapHome" 
      component={MapScreen}
      options={{ title: 'Expolre Nearby Resturants' }}
    />
  </Stack.Navigator>
);

const PostStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="NewPost" 
      component={PostScreen}
      options={{ title: 'Create Post' }}
    />
  </Stack.Navigator>
);

const EventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="EventsHome" 
      component={EventsScreen}
      options={{ title: 'Events' }}
    />
    <Stack.Screen 
      name="NewEvent" 
      component={NewEventScreen}
      options={{ title: 'Create Event' }}
    />
    <Stack.Screen 
      name="EditEvent" 
      component={EditEventScreen}
      options={{ title: 'Edit Event' }}
    />
  </Stack.Navigator>
);

// Logout function
const handleLogout = async () => {
  try {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: async () => await signOut(auth) },
    ]);
  } catch (error) {
    console.error('Error signing out:', error);
    Alert.alert('Error', 'Failed to sign out');
  }
};

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileHome" 
      component={ProfileScreen}
      options={{ title: 'Profile',
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen 
      name="EditProfile" 
      component={EditProfileScreen}
      options={{ title: 'Edit Profile' }}
    />
  </Stack.Navigator>
);

// Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Feed':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Map':
            iconName = focused ? 'map' : 'map-outline';
            break;
          case 'Post':
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            break;
          case 'Events':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF6B6B',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Feed" component={FeedStack} />
    <Tab.Screen name="Map" component={MapStack} />
    <Tab.Screen name="Post" component={PostStack} />
    <Tab.Screen name="Events" component={EventsStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is signed in
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        // No user is signed in
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;