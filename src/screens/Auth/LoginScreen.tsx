import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';

import {login} from '../../store/redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StoreType} from '../../store/store';
import Header from '../../components/Header';
import {colors} from '../../assets/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: StoreType) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const submit = async () => {
    await dispatch(
      login({
        email: email,
        password: '',
      }),
    );
  };
  useEffect(() => {
    authState.response.statusCode == 200 ? navigation.navigate('Home') : null;
  }, [authState.response.statusCode]);

  useEffect(() => {
    AsyncStorage.getItem('isLoggedIn')
      .then(isLoggedIn => {
        if (isLoggedIn === 'true') {
          navigation.navigate('Home');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (authState.loading === false) {
      if (authState.response.statusCode === 200) {
        AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.navigate('Home');
      } else if (authState.response.statusCode === 404) {
        console.log('Something is wrong');
      }
    }
  }, [authState.loading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
      />
      {authState.response.statusCode == 404 ? (
        <Text style={{color: 'red'}}>Something is wrong</Text>
      ) : null}
      <View style={{width: '100%', padding: 20}}>
        <Pressable
          onPress={submit}
          style={{
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
            }}>
            Submit
          </Text>
        </Pressable>
      </View>
      <Text style={{color: 'red'}}>{authState.response.error}</Text>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{color: 'blue'}}>Hesabınız yok mu? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: 'blue'}}>Kayıt Ol</Text>
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
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  input: {
    marginBottom: 20,
  },
});
