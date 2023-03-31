import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddReview from '../screens/AddReview';


const Stack = createStackNavigator();


const HomeStack = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddReview" component={AddReview} />
    </Stack.Navigator>
  </NavigationContainer>

  )
}

export default HomeStack

const styles = StyleSheet.create({})