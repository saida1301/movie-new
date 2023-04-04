import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft,faBookOpen,faHeart,faHouse,faMessage} from '@fortawesome/free-solid-svg-icons';
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
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faHouse}
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Benim Yorumlarım"
          component={MyReviewsScreen}
          options={({route}) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.push("Tabs")}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            ),
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: colors.black,
                  flex: 1,
                  flexDirection: 'row',
                }}></View>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerStyle: {
              backgroundColor: colors.black,
              shadowColor: colors.black,
            },
            headerTitleStyle: {
              color: colors.white,
            },
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (

              <FontAwesomeIcon
                icon={faBookOpen}
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Chatgpt ile sohbet"
          component={ChatScreen}
          options={({route}) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.push("Tabs")}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            ),
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: colors.black,
                  flex: 1,
                  flexDirection: 'row',
                }}></View>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerStyle: {
              backgroundColor: colors.black,
              shadowColor: colors.black,
            },
            headerTitleStyle: {
              color: colors.white,
            },
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faMessage}
                size={24}
                style={focused ? styles.tabIconActive : styles.tabIconInactive}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Favorilerim"
          component={FavoritesScreen}
          options={({route}) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.push("Tabs")}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            ),
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: colors.black,
                  flex: 1,
                  flexDirection: 'row',
                }}></View>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerStyle: {
              backgroundColor: colors.black,
              shadowColor: colors.black,
            },
            headerTitleStyle: {
              color: colors.white,
            },
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faHeart}
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
