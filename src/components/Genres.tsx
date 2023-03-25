import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {API_KEY} from '../services/urls';

import {borderRadius, colors, fontSizes} from '../assets/themes';

interface Movie {
  vote_average: number;
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}
const Genres = ({navigation}: any) => {
  const [selectedList, setSelectedList] = useState('movies');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [animations, setAnimations] = useState<Movie[]>([]);
  const ITEMS_PER_PAGE = 4;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;
  const itemsToDisplay = movies.slice(startIndex, endIndex);
  const animationsToDisplay = animations.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`,
      );

      const newMovies = result.data.results.filter(
        (movie: {genre_ids: number[]}) => !movie.genre_ids.includes(16),
      );
      setMovies(prevMovies => [...prevMovies, ...newMovies]);

      const newAnimations = result.data.results.filter(
        (movie: {genre_ids: number[]}) => movie.genre_ids.includes(16),
      );
      setAnimations(prevAnimations => [...prevAnimations, ...newAnimations]);
    };

    fetchData();
  }, [page]);

  const renderMovies = () => (
    <FlatList
      data={itemsToDisplay}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {id: item.id})}>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={styles.image}
          />
          <Text
            style={[
              styles.rating,
              {
                borderColor:
                  item.vote_average >= 5 && item.vote_average < 7
                    ? 'red'
                    : 'black',
              },
            ]}>{`${item.vote_average}`}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderAnimations = () => (
    <FlatList
      data={animationsToDisplay}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {id: item.id})}>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={styles.image}
          />
          <Text
            style={[
              styles.rating,
              {
                borderColor:
                  item.vote_average >= 5 && item.vote_average < 7
                    ? 'red'
                    : 'black',
              },
            ]}>{`${item.vote_average}`}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderSelectedList = () => {
    switch (selectedList) {
      case 'movies':
        return renderMovies();
      case 'animations':
        return renderAnimations();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => setSelectedList('movies')}
          style={styles.button}>
          <Text style={{marginRight: 10}}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedList('animations')}
          style={styles.button}>
          <Text>Animations</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 120,
            gap: 10,
            alignItems: 'center',
          }}>
          <Pressable onPress={() => setPage(page - 1)}>
            <Text style={{fontSize: 22}}>&#8592;</Text>
          </Pressable>
          <Pressable onPress={() => setPage(page + 1)}>
            <Text style={{fontSize: 22}}>&#8594;</Text>
          </Pressable>
        </View>
      </View>

      <View style={{marginTop: 10}}>{renderSelectedList()}</View>
    </View>
  );
};

export default Genres;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: 180,
    height: 225,
    margin: 10,
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#f00',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieContainer: {
    marginVertical: 20,
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 14,
  },
  rating: {
    fontSize: fontSizes.medium,
    margin: 20,
    alignSelf: 'flex-start',
    color: colors.white,
    justifySelf: 'flex-start',
    position: 'absolute',
    backgroundColor: 'rgba(26,25,31,0.6)',
    top: 0,
    padding: 7,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
