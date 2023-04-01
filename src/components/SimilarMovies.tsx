import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { borderRadius, colors, fontSizes, spacing } from '../assets/themes';
import { API_KEY } from '../services/urls';


type Props = {
  movieId: string;
};

type Movie = {
  id: string;
  title: string;
  poster_path: string;
}

const SimilarMovies = ({ movieId }: Props) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`);
        const data = response.data.results;
        setSimilarMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSimilarMovies();
  }, [movieId]);

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.movieContainer}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Similar Movies</Text>
      <FlatList
        data={similarMovies}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};



export default SimilarMovies;
const styles = StyleSheet.create({
    container: {
      marginTop: spacing.large,
    },
    heading: {
      color: colors.white,
      fontSize: fontSizes.large,
      fontWeight: 'bold',
      marginBottom: spacing.medium,
    },
    movieContainer: {
      marginRight: spacing.medium,
    },
    poster: {
      width: 100,
      height: 150,
      borderRadius: borderRadius.small,
    },
    title: {
      color: colors.white,
      fontSize: fontSizes.small,
      marginTop: spacing.small,
      textAlign: 'center',
      maxWidth: 100,
    },
  });