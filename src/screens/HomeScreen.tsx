import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import Genres from '../components/Genres';
import SearchScreen from '../components/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen';
import AddReview from './AddReview';



const Stack = createNativeStackNavigator()

const HomeScreen = ({navigation}:any) => {
  return (
  
   <ScrollView style={{padding:10, backgroundColor:"black"}}>
    <SearchScreen />
  <Card rating={0}/>
 <Genres navigation={navigation}/>


    </ScrollView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
