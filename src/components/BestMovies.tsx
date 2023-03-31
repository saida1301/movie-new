import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_KEY } from '../services/urls';
import { useNavigation } from '@react-navigation/native';
import { borderRadius, colors, fontSizes, spacing } from '../assets/themes';
import  Feather  from 'react-native-vector-icons/Feather';

const BestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [numMoviesToShow, setNumMoviesToShow] = useState(4);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&primary_release_date.gte=2022-03-01&primary_release_date.lte=2022-03-31`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
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
      {movies.slice(0, numMoviesToShow).map((movie) => (
        <TouchableOpacity
          style={styles.movieContainer}
          key={movie.id}
          onPress={() => navigation.navigate('Details', { id: movie.id })}
        >
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
          <Feather name="arrow-right" size={24} color={colors.white} />
        </TouchableOpacity>
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
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    marginTop: -40,
    color:colors.white,
    },
  rating: {
    fontSize: fontSizes.medium,
    color: colors.gray[500],
  },
  showMore: {
    backgroundColor: colors.primary,
    padding: spacing.large,
    paddingVertical: spacing.small,
    borderRadius: borderRadius.small,
    alignSelf: 'center',
    margin: spacing.small,
    color:colors.white,}
});

export default BestMovies;
