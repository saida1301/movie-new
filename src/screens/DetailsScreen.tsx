import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';
import {API_KEY} from '../services/urls';
import WebView from 'react-native-webview';
import AddButtons from '../components/AddButtons';
import {colors, spacing} from '../assets/themes';
const MAX_LINES = 3;
const DetailsScreen = ({navigation, route}: any) => {
  const {id, movie_id} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits&language=en-US
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
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
      );
      if (response.data.results.length > 0) {
        const trailerKey = response.data.results[0].key;
        setTrailer(`https://www.youtube.com/embed/${trailerKey}`);
      }
    };
    fetchTrailer();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.105:3000/review/${movie_id}`,
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [movie_id]);

  const handleHeartPress = (movieId: any) => {
    setFavorite(!isFavorite);
  };

  const handlePressReview = (movie_id: any, author_id: any) => {
    navigation.navigate('AddReview', {movie_id, author_id});
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
      <>
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
      </>
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
              data={movie.reviews?.results}
              renderItem={renderReview}
              keyExtractor={item => item.id.toString()}
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
    backgroundColor: 'black',
  },
  trailer: {
    flex: 1,
    height: 300,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
    flex: 1,
    flexWrap: 'wrap',
  },
  releaseDate: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },

  overview: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  castMemberContainer: {
    justifyContent: 'space-between',
  },
  castMemberImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    justifyContent: 'space-around',
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  reviewContent: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
  },
  addreview: {
    position: 'absolute',
    top: 40,
    right: 20,
    borderRadius: 35,
    backgroundColor: 'white',
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
