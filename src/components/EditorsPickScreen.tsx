import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_KEY } from '../services/urls';
import { useNavigation } from '@react-navigation/native';

const EditorsPick = ({ movies }: any) => {

  const navigation = useNavigation();

  const cardWidth = 160;
  const spacing = 8;
  const containerWidth = cardWidth + spacing * 2;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editors Pick</Text>
      <FlatList
        data={movies}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { id: item.id })}>
            <View style={[styles.card, { width: containerWidth }]}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.subtitle}>{item.vote_average}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 10,
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 250,
  },
  imageContainer: {
    width: 160,
    height: 220,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 160,
    height: 220,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
marginTop:-5
  },
});

const EditorsPickScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=5000&page=1`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View>
      <EditorsPick movies={movies} />
    </View>
  );
};

export default EditorsPickScreen;
