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

import SplashScreen from './src/SplashScreen';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();



const Stack = createNativeStackNavigator();
const App = () => {


  const clear = () => {
    AsyncStorage.clear()
  }

  const [islogin, setislogin] = useState(false);



//   if (!islogin) {
//     return (
// <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="SplashScreen"
//           screenOptions={{headerShown: false}}
//         >
//           <Stack.Screen name="SplashScreen" component={SplashScreen} />
//           <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}} />
//           <Stack.Screen
//             name="signup"
//             component={Register}
//             options={{headerShown: false}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
// </Provider>
//     );
//   }

  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}
      >   
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="Tabs" component={TabNavigator} />

          <Stack.Screen name="signup" component={Register} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="AddReview" component={AddReview} />
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
          <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
