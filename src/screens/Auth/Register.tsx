import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StoreType} from '../../store/store';
import {register} from '../../store/redux/authSlice';
import Header from '../../components/Header';
import {colors} from '../../assets/themes';

const Register = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: StoreType) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    await dispatch(
      register({
        email: email,
        name: name,
        password: '',
      }),
    );
  };
  useEffect(() => {
    authState.response.statusCode == 200 ? navigation.navigate('login') : null;
  }, [authState.response.statusCode]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Full name"
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        style={styles.input}
      />
      <View
        style={{
          width: '100%',
          padding: 20,
        }}>
        <Pressable
          onPress={onSubmit}
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
      <Text
        style={{
          color: 'red',
        }}>
        {authState.response.error}
      </Text>

      <View style={{flexDirection:"row", justifyContent:"center"}}>
      <Text  style={{
            color: 'blue',
          }}> hesabiniz var? </Text>
        <Pressable onPress={() => navigation.navigate('login')}>
        <Text
          style={{
            color: 'blue',
          }}>
          Login Screen
        </Text>
        </Pressable>
      </View>

    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor:"#1c1c1c"
  },
  input: {
    marginBottom: 20,
  },
});
