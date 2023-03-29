import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddReview from './src/screens/AddReview';
import TabNavigator from './src/navigation/tabs/TabNavigator';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ChatScreen from './src/screens/ChatScreen';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import LoginScreen from './src/screens/Auth/LoginScreen';
import Register from './src/screens/Auth/Register';
import OnBoardingScreen from './src/screens/OnBoardingScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<Boolean>(false);
  const [islogin, setislogin] = useState(false)

  useEffect(() => {
    const checkIfAppIsFirstLaunched = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    };
    checkIfAppIsFirstLaunched();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen name="Onboarding" component={OnBoardingScreen} options={{headerShown: false}}/> */}
          {/* <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}} /> */}
          <Stack.Screen name="signup" component={Register} options={{headerShown: false}} />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddReview"
            component={AddReview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              headerStyle: {
                backgroundColor: '#1c1c1c',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />


{
  islogin ? (
    <Stack.Screen
    name="Chat"
    component={ChatScreen}
    options={{headerShown: false}}
  />
  ) : (
    <Stack.Screen
    name="login"
    component={LoginScreen}
    options={{headerShown: false}}
  />
  )
}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
