import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FeedScreen from './src/screens/FeedScreen';
import MapScreen from './src/screens/MapScreen';
import PostScreen from './src/screens/PostScreen';
import EventsScreen from './src/screens/EventsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
