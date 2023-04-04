import { StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { colors, fontSizes, spacing } from "../assets/themes";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = async () => {
    const userId = await AsyncStorage.getItem('userId');

    axios.get(`http://192.168.0.105:3000/favorites/1`)
      .then((response) => {
        setFavorites(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));     
  };

  useEffect(() => {
    getFavorites();
  }, []);


  const removeFavorite = async (userId: any, movie_id: any) => {
    try {
      await axios.delete(`http://192.168.0.105:3000/favorites/1/${movie_id}`);
      const updatedFavorites = favorites.filter((movie) => movie.id !== movie_id);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" style={{backgroundColor:colors.black, height:"100%"}} />;
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



export default FavoritesScreen;

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: colors.black,
    padding: spacing.small,
  },
  baseContainer: {
    flex: 1,
    backgroundColor: colors.black,
    width: "100%",
height: "100%",
  },
  container: {
    flexDirection: 'row',
    padding: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    backgroundColor:colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 120,
    marginRight: spacing.small,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color:"white",
    bottom: spacing.small,
  },
  removeButton: {
    color: 'red',
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },

});
