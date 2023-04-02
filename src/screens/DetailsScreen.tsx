import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {API_KEY} from '../services/urls';
import WebView from 'react-native-webview';
import AddButtons from '../components/AddButtons';
import {borderRadius, colors, fontSizes, spacing} from '../assets/themes';

const MAX_LINES = 3;

const DetailsScreen = ({navigation, route}: any) => {
  const {id, movie_id, author} = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits&language=tr-TR
      `;
    axios
      .get(apiUrl)
      .then(response => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
        );
        if (response.data.results.length > 0) {
          const trailerKey = response.data.results[0].key;
          setTrailer(`https://www.youtube.com/embed/${trailerKey}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrailer();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log(
          'movie_id:',
          id
        );
        const response = await axios.get(
          `http://192.168.0.105:3000/reviews/${id}`,
        );
        const reviewsData = response.data;
        setReviews(reviewsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id]);

  const handleHeartPress = (movieId: any) => {
    setIsFavorite(!isFavorite);
  };

  const handlePressReview = (movie_id: any, author: any) => {
    navigation.navigate('AddReview', {movie_id, author, onAddReview});
  };

  const onAddReview = (review: any) => {
    setReviews([...reviews, review]);
  };

  if (!movie) {
    return null;
  }

  const renderCastMember = ({item}: any) => {
    return (
      <View style={styles.castMemberContainer}>
        <Image
          style={styles.castMemberImage}
          source={{uri: `https://image.tmdb.org/t/p/w200/${item.profile_path}`}}
        />
      </View>
    );
  };

  const renderReview = ({item}: any) => {
    const toggleFullText = () => {
      setShowFullText(!showFullText);
    };
    return (
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewAuthor}>{item.author}</Text>
        <TouchableOpacity
          onPress={toggleFullText}
          style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text
            numberOfLines={showFullText ? undefined : MAX_LINES}
            ellipsizeMode="tail"
            style={styles.reviewContent}>
            {item.content}
          </Text>
          {!showFullText && <Text style={{color: colors.primary}}>more</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        {trailer ? (
          <WebView
            style={{height: 300}}
            javaScriptEnabled={true}
            autoManageStatusBarEnabled
            source={{uri: trailer}}
            loop={true}
          />
        ) : null}
        <View style={styles.detailsContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{movie.title}</Text>
            <AddButtons
              movie_id={id}
              onPressFavorite={handleHeartPress}
              onPressReview={handlePressReview}
            />
          </View>
          <Text style={styles.releaseDate}> {movie.release_date}</Text>

          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.sectionHeader}>Cast</Text>
          <FlatList
            data={movie.credits.cast.slice(0, 4)}
            renderItem={renderCastMember}
            keyExtractor={item => item.credit_id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.castListContainer}
          />
          <View style={{marginTop: spacing.large}}>
            <Text style={styles.sectionHeader}>Reviews</Text>
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  trailer: {
    flex: 1,
    height: 300,
  },
  detailsContainer: {
    padding: spacing.medium,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginVertical: spacing.small,
    color: colors.white,
    flex: 1,
    flexWrap: 'wrap',
  },
  releaseDate: {
    fontSize: fontSizes.small,
    marginBottom: spacing.small,
    color: colors.white,
  },

  overview: {
    fontSize: fontSizes.medium,
    marginBottom: spacing.small,
    color: colors.white,
  },
  sectionHeader: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginTop: spacing.large,
    marginBottom: spacing.small,
    color: colors.white,
  },
  castMemberContainer: {
    justifyContent: 'space-between',
  },
  castMemberImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    justifyContent: 'space-around',
    borderRadius: borderRadius.large,
    marginRight: spacing.small,
  },
  reviewContainer: {
    marginBottom: spacing.medium,
  },
  reviewAuthor: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.white,
  },
  reviewContent: {
    fontSize: fontSizes.small,
    lineHeight: 20,
    color: colors.white,
  },
  addreview: {
    position: 'absolute',
    top: 40,
    right: spacing.medium,
    borderRadius: borderRadius.large,
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00000070',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 1,
    elevation: 3,
  },
});

export default DetailsScreen;
