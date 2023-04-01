import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import Genres from '../components/Genres';
import SearchScreen from '../components/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ComingSoonScreen from '../components/ComingSoonScreen';
import EditorsPickScreen from '../components/EditorsPickScreen';
import TrendingMovies from '../components/TrendingMovies';
import BestMovies from '../components/BestMovies';
import { spacing } from '../assets/themes';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}: any) => {
  return (
    <ScrollView style={styles.container}>
      <SearchScreen />
      <Card />
      <Genres navigation={navigation} />
      <ComingSoonScreen />
      <EditorsPickScreen />
      <TrendingMovies />
      <BestMovies />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: spacing.small,
    backgroundColor: 'black',
  },
});
