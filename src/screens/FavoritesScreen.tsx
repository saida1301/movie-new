import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { API_KEY } from "../services/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritesContext } from "../store/FavoritesContext";

const FavoritesScreen = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await Promise.all(
        favorites.map((movie_id: string) =>
          fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`).then((response) =>
            response.json()
          )
        )
      );
      setMovies(movieData);
    };
    fetchMovies();
  }, [favorites]);

  const handleRemoveFavorite = async (movieId: string) => {
    let newFavorites = favorites.filter((id: string) => id !== movieId);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isFavorite = favorites.includes(item.id);
    return (
      <View key={`${item.id}`} style={styles.movieContainer}>
        <Image style={styles.posterImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}} />
        <View style={{flexDirection:"column"}}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          {isFavorite && (
            <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
              <Text style={styles.removeFavorite}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={{backgroundColor:"black"}}
      data={movies}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
    />
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
