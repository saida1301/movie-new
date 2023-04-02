import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {borderRadius, colors, fontSizes, spacing} from '../assets/themes';
import {API_KEY, TMDB_BASE_URL} from '../services/urls';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';



interface Props {
  rating: number;
  poster_path: string;
  id: string;
}

const API_URL = `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=1`;

const Card = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    axios.get(API_URL).then(response => {
      setMovies(response.data.results);
    });
  }, []);

  const renderMovieCard = ({item}: any) => (
<TouchableOpacity onPress={() => navigation.navigate('Details', {id: item.id} as {id: string})}>
      <View style={styles.card}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          style={styles.image}
          resizeMode="contain"
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
      </View>
    </TouchableOpacity>
  );

  return (
    <Carousel
      data={movies}
      renderItem={renderMovieCard}
      sliderWidth={400}
      itemWidth={250}
      inactiveSlideOpacity={0}
      pagingEnabled={true}
      autoplay={true}
      autoplayInterval={3000}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 250,
    elevation: 5,
    marginVertical: spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    width: 400,
    height: 250,
    resizeMode: 'cover',
  },

  rating: {
    fontSize: fontSizes.medium,
    margin: spacing.large,
    alignSelf: 'flex-start',
    color: colors.primary,
    justifySelf: 'flex-start',
    position: 'absolute',
    top: 0,
    padding: spacing.small,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
