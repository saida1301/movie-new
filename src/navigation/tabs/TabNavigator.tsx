import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyReviewsScreen from '../../screens/MyReviewsScreen';
import ChatScreen from '../../screens/ChatScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: '#1c1c1c',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen} 
          options={({ route }) => ({
            headerShown: false,
            tabBarShowLabel:false,
            tabBarIcon: () => (
              <Ionicons name="home" size={24} color="black" />
            ),
          })}
        />
        <Tab.Screen
          name="MyReviews"
          component={MyReviewsScreen}
          options={({ route }) => ({
            headerShown: false,
            tabBarShowLabel:false,
            tabBarIcon: () => (
              <Ionicons name="star" size={24} color="#8843E1" />
            ),
          })}
        />
                <Tab.Screen
          name="OpenAi"
          component={ChatScreen}
          options={({ route }) => ({
            headerShown: false,
            tabBarShowLabel:false,
            tabBarIcon: () => (
              <Ionicons name="star" size={24} color="#8843E1" />
            ),
          })}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default TabNavigator;
