import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyReviewsScreen from '../../screens/MyReviewsScreen';
import ChatScreen from '../../screens/ChatScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../assets/themes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#1c1c1c',
          },
          tabBarActiveTintColor: 'red',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="home"
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        <Tab.Screen
          name="MyReviews"
          component={MyReviewsScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="star-outline"
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        <Tab.Screen
          name="OpenAi"
          component={ChatScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="chatbox-outline"
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Ionicons
                name="heart-outline"
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabIconActive: {
    color: colors.primary,
  },
  tabIconInactive: {
    color: colors.white,
  },
});

export default TabNavigator;
