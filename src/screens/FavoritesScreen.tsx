import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../services/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = ({ route }: any) => {
  const [movies, setMovies] = useState([]);


useEffect(() => {
  const fetchMovies = async () => {
    const favorites = route.params?.favorites || [];
    const movieData = await Promise.all(
      favorites.map((movieId: string) =>
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`).then((response) =>
          response.json()
        )
      )
    );
    setMovies(movieData);
  };
  fetchMovies();
}, [route.params]);


  const handleRemoveFavorite = async (movieId: string) => {
    const favoritesString = await AsyncStorage.getItem('favorites');
    let favorites = favoritesString ? JSON.parse(favoritesString) : [];

    favorites = favorites.filter((id: string) => id !== movieId);

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

    setMovies(movies.filter((movie: any) => movie.id !== movieId));
  };

  return (
    <ScrollView style={{backgroundColor:"black", }}>
      {movies.map((movie, index) => {
        const isFavorite = route.params?.favorites.includes(movie.id);
        return (
          <View style={{marginTop:-118, marginBottom:53}}>
          <View key={`${movie.id}-${index}`} style={styles.movieContainer}>
            <Image style={styles.posterImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}} />
            <View style={{flexDirection:"column"}}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              {isFavorite && (
                <TouchableOpacity onPress={() => handleRemoveFavorite(movie.id)}>
                  <Text style={styles.removeFavorite}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,


  },
  posterImage: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius:25,
    marginBottom:50
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flexWrap: "nowrap",
  },
  removeFavorite: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default FavoritesScreen;