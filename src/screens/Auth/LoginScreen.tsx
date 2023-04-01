import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {login} from '../../store/redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StoreType} from '../../store/store';
import {borderRadius, colors, fontSizes, spacing} from '../../assets/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: StoreType) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const submit = async () => {
    setIsLoading(true);
    await dispatch(
      login({
        email: email,
        password: password,
      }),
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (authState.loading === false) {
      if (authState.response.statusCode === 200) {
        AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Tabs');
      }
    }
  }, [authState.loading]);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.navigate('Tabs');
      }
    };
    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    if (authState.loading === false) {
      setIsLoading(false);
      if (authState.response.statusCode === 200) {
        AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Tabs');
      } else if (authState.response.statusCode === 404) {
        console.log('Something is wrong');
      }
    }
  }, [authState.loading]);

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
        label="Şifrə"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
      />
      {authState.response.statusCode == 404 ? (
        <Text style={{color: 'red'}}>Something is wrong</Text>
      ) : null}
      <View style={{width: '100%', padding: spacing.large}}>
        <Pressable
          onPress={submit}
          style={styles.button}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: fontSizes.large,
            }}>
            Submit
          </Text>
        </Pressable>
      </View>
      <Text style={{color: 'red'}}>{authState.response.error}</Text>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.title}>Hesabınız yoxdur? </Text>
        <Pressable onPress={() => navigation.navigate('signup')}>
          <Text style={styles.title}>Qeydiyyatdan keç</Text>
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
    fontSize: fontSizes.large,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.large,
    borderRadius: borderRadius.large,
  }
});
