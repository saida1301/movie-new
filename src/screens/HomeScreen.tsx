import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import Genres from '../components/Genres';
import SearchScreen from '../components/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import AddReview from './AddReview';
import ComingSoonScreen from '../components/ComingSoonScreen';
import EditorsPickScreen from '../components/EditorsPickScreen';
import TrendingMovies from '../components/TrendingMovies';
import BestMovies from '../components/BestMovies';



const Stack = createNativeStackNavigator()

const HomeScreen = ({navigation}:any) => {
  return (
  
   <ScrollView style={{padding:10, backgroundColor:"black"}}>
    <SearchScreen />
  <Card rating={0}/>
 <Genres navigation={navigation}/>

<ComingSoonScreen/>
<EditorsPickScreen/>
<TrendingMovies/>
<BestMovies/>
    </ScrollView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
