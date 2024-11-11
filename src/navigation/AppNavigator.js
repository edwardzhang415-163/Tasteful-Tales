import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import FeedScreen from '../screens/FeedScreen';
import MapScreen from '../screens/MapScreen';
import PostScreen from '../screens/PostScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NewEventScreen from '../screens/NewEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Individual stack navigators for each tab
const FeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="FeedHome" 
      component={FeedScreen}
      options={{ title: 'Feed' }}
    />
    <Stack.Screen 
      name="PostDetails" 
      component={PostDetailsScreen}
      options={{ title: 'Post' }}
    />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MapHome" 
      component={MapScreen}
      options={{ title: 'Map' }}
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

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileHome" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
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
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;