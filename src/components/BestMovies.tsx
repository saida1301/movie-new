import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {API_KEY} from '../services/urls';
import {useNavigation} from '@react-navigation/native';
import {borderRadius, colors, fontSizes, spacing} from '../assets/themes';
import Feather from 'react-native-vector-icons/Feather';

const BestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [numMoviesToShow, setNumMoviesToShow] = useState(4);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('http://192.168.0.105:3000/movies/best')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleShowMore = () => {
    setNumMoviesToShow(numMoviesToShow + 4);
  };

  const handleShowLess = () => {
    setNumMoviesToShow(4);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Best Movies</Text>
      {movies.slice(0, numMoviesToShow).map(movie => (
        <View style={styles.movieContainer} key={movie.id}>
          <Image
            style={styles.poster}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
          <View style={styles.movieDetails}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
          </View>
          <Pressable
            style={{marginRight: 20}}
            onPress={() => navigation.navigate('Details', {id: movie.id})}>
            <Feather name="arrow-right" size={24} color={colors.white} />
          </Pressable>
        </View>
      ))}
      {numMoviesToShow < movies.length ? (
        <TouchableOpacity onPress={handleShowMore}>
          <Text style={styles.showMore}>Show More</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleShowLess}>
          <Text style={styles.showMore}>Show Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: spacing.small,
    marginBottom: 100,
  },

  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.large,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.small,
    padding: spacing.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: spacing.small,
    borderRadius: borderRadius.small,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.black,
  },
  header: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.white,
  },
  rating: {
    fontSize: fontSizes.medium,
    color: colors.primary,
  },
  showMore: {
    backgroundColor: colors.primary,
    padding: spacing.large,
    paddingVertical: spacing.small,
    borderRadius: borderRadius.small,
    alignSelf: 'center',
    margin: spacing.small,
    color: colors.white,
  },
});

export default BestMovies;
