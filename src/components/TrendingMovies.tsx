import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { API_KEY, TMDB_BASE_URL } from '../services/urls';
import { borderRadius, colors, fontSizes, spacing } from '../assets/themes';

const windowWidth = Dimensions.get('window').width;



const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<{id: number}[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
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

      </View>
        </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>
        <Text style={styles.header}>Trend Olan Filmler</Text>
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
    marginVertical: spacing.medium,
    backgroundColor:colors.black,
    padding: spacing.small,
  },
  header: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: spacing.large,
    },
  slide: {
    width: windowWidth/3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: borderRadius.small,
    marginTop: spacing.small,
  },
});

export default TrendingMovies;