import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, StoreType} from '../../store/store';
import {register} from '../../store/redux/authSlice';
import Header from '../../components/Header';
import {borderRadius, colors, fontSizes, spacing} from '../../assets/themes';

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
        placeholder="Istifadeçi adı"
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Şifrə"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        style={styles.input}
      />
      <View
        style={{
          width: '100%',
          padding: spacing.small,
        }}>
        <Pressable
          onPress={onSubmit}
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
      <Text
        style={{
          color: 'red',
        }}>
        {authState.response.error}
      </Text>

      <View style={{flexDirection:"row", justifyContent:"center"}}>
      <Text  style={styles.title}> Hesabınız var? </Text>
        <Pressable onPress={() => navigation.navigate('login')}>
        <Text
          style={styles.title}>
        Daxil ol
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
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.large,
    backgroundColor:colors.gray[800]
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
  button: {
    backgroundColor: colors.primary,
    padding: spacing.large,
    borderRadius: borderRadius.large,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.medium,
  },
});
