import React, {useEffect, useState} from 'react';
import { View,Text,Image, StyleSheet,TouchableOpacity, Pressable} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {borderRadius, colors, fontSizes, spacing} from '../assets/themes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
interface Movies {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}
const BestMovies = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [numMoviesToShow, setNumMoviesToShow] = useState(4);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`http://172.16.0.184:3000/movies/best`)
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
      <Text style={styles.header}>En iyi filmler</Text>
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
            <Text style={styles.rating}>Reyting: {movie.vote_average}</Text>
          </View>
          <Pressable
            style={{marginRight: 35}}
            onPress={() => navigation.navigate('Details', {id: movie.id})}>
        <FontAwesomeIcon icon={faArrowRight} color={colors.primary} size={24}/>
          </Pressable>
        </View>
      ))}
      {numMoviesToShow < movies.length ? (
        <TouchableOpacity onPress={handleShowMore}>
          <Text style={styles.showMore}>Daha çox</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleShowLess}>
          <Text style={styles.showMore}>Daha az</Text>
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
    marginBottom: spacing.large,
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
    marginLeft: spacing.small,
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
    color: '#fff',
    marginBottom: spacing.medium,
    marginTop: -30,
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
    color: colors.white,
  },
});

export default BestMovies;
