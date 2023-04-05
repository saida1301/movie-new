import {StyleSheet, Text, View, Pressable, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {login} from '../../store/redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StoreType} from '../../store/store';
import {borderRadius, colors, fontSizes, spacing} from '../../assets/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: StoreType) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const submit = async () => {
    setIsLoading(true);
    await dispatch(
      login({
        email: email,
        password: password,
      }),
     
    );
    setIsLoading(false);
    AsyncStorage.setItem('isLoggedIn', 'true');
    const resetAction = CommonActions.reset({
      index: 0, 
      routes: [{ name: 'Tabs' }],
    });
    navigation.dispatch(resetAction);
    navigation.navigate('Tabs')
  };

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      console.log(isLoggedIn);
      
      if (isLoggedIn === 'true') {
        navigation.navigate('Tabs');
      }
    };
    checkLoggedInStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/launch_screen.png')}
        style={styles.image}
      />

      <TextInput
        placeholder="E-mail"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Şifre"
        secureTextEntry={!isPasswordVisible}
        onChangeText={setPassword}
        right={
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{paddingHorizontal: 10}}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeDropper} size={24} color="gray" />
          </TouchableOpacity>
        }
      />
      {authState.response.statusCode == 404 ? (
        <Text style={{color: 'red'}}>Yanlış bi şey var</Text>
      ) : null}
<View style={{width: '100%', padding: spacing.large}}>
  <Pressable onPress={submit} style={styles.button}>
    {isLoading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text style={{textAlign: 'center', color: 'white', fontSize: fontSizes.large}}>
        Daxil ol
      </Text>
    )}
  </Pressable>
</View>

      <Text style={{color: 'red'}}>{authState.response.error}</Text>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.title}>Hesabınız yok mu? </Text>
        <Pressable onPress={() => navigation.navigate('signup')}>
          <Text style={styles.title}>Kayıt ol</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.large,
    backgroundColor: '#1c1c1c',
  },
  input: {
    marginBottom: spacing.large,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: fontSizes.medium,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.large,
    borderRadius: borderRadius.large,
  }
});