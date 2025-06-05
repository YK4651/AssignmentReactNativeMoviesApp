import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import screens
import MoviesScreen from './src/screens/MoviesScreen';
import SearchScreen from './src/screens/SearchScreen';
import TVScreen from './src/screens/TVScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator Component
function TabNavigator() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: { backgroundColor: '#000' },
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="TV" component={TVScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// Main App with Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Movies App" 
                        options={{ title: 'Home',
                                   headerStyle: { backgroundColor: '#030a6e'}, 
                                   headerTitleStyle: {
                                        color: 'white',
                                      }, }} 
                        component={TabNavigator} 
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );}

  const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: 'navy',
  }
});