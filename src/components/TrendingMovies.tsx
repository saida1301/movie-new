import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { API_KEY } from '../services/urls';

const windowWidth = Dimensions.get('window').width;



const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => setTrendingMovies(json.results))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }:any) => {
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('Details', {id: item.id})}>
      <View style={styles.slide}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
        </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>
        <Text style={{fontSize:20, fontWeight:"bold", color:"white", marginLeft:20, margin:20}}>Trending Movies</Text>
      <FlatList
        data={trendingMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={windowWidth}
        snapToAlignment='start'
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginVertical: 10,
    backgroundColor:"black"
  },
  slide: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TrendingMovies;
