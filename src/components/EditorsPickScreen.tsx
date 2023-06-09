import React, {useState, useEffect} from 'react';
import {View,Text,FlatList,Image,StyleSheet,TouchableOpacity} from 'react-native';
import axios from 'axios';
import {API_KEY, TMDB_BASE_URL} from '../services/urls';
import {useNavigation} from '@react-navigation/native';
import {borderRadius, colors, fontSizes, spacing} from '../assets/themes';

const EditorsPick = ({movies}: any) => {
  const navigation = useNavigation();

  const cardWidth = 160;
  const spacing = 8;
  const containerWidth = cardWidth + spacing * 2;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editörün Seçimi</Text>
      <FlatList
        data={movies}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', {id: item.id})}>
            <View style={[styles.card, {width: containerWidth}]}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.subtitle}>{item.vote_average}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const EditorsPickScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=5000&page=1`,
      )
      .then(response => setMovies(response.data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <EditorsPick movies={movies} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.small,
  },
  heading: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginHorizontal: spacing.small,
    marginBottom: spacing.small,
    color: colors.white,
  },
  card: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.small,
    marginHorizontal: spacing.small,
    shadowColor: colors.white,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 250,
  },
  imageContainer: {
    width: 160,
    height: 220,
    borderBottomRightRadius: borderRadius.small,
    overflow: 'hidden',
  },
  image: {
    width: 160,
    height: 220,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: spacing.small,
  },
  subtitle: {
    fontSize: fontSizes.small,
    color: colors.gray[800],
    marginTop: -5,
  },
});

export default EditorsPickScreen;
