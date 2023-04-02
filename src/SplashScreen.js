import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('login');
    });
  }, [fadeAnim, navigation]);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.navigate('Tabs');
      }
    };
    checkLoggedInStatus();
  }, []);



  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('movieapp/src/assets/images/launch_screen.png')}
        style={[styles.image, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;