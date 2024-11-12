import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppNavigator from './src/navigation/AppNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>

  );
}
