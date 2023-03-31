import { StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import moment from "moment";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = async () => {
    const userId = await AsyncStorage.getItem('userId');

    axios.get(`http://192.168.0.105:3000/favorites/4`)
      .then((response) => {
        setFavorites(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));     
  };

  useEffect(() => {
    getFavorites();
  }, []);


  const removeFavorite = async (userId: any, movieId: any) => {
    try {
      await axios.delete(`http://192.168.0.105:3000/favorites/4/${movieId}`);
      const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (

          <View style={styles.baseContainer}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>
                  {moment(item.release_date).format('MMMM DD, YYYY')}
                </Text>
                <TouchableOpacity onPress={() => removeFavorite(4, item.id)}>
            <Text style={styles.removeButton}>Remove</Text>
          </TouchableOpacity>
              </View>
            </View>
          </View>
   
      )}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#000",
    padding: 10,
  },
  baseContainer: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
height: "100%",
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor:"black",
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"white",
    bottom: 10,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default FavoritesScreen;
