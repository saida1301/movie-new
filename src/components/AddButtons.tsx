import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const AddButtons = ({movie_id, onPressReview}: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [author, setAuthor] = useState('');
  const [id, setUserId] = useState('4');
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`http://192.168.0.105:3000/user/${id}`)
      .then((response) => {
        const { name } = response.data;
        setAuthor(name);
      })
      .catch((error) => console.error(error));     
  }, []);
  
  

  const handleFavoritePress = async () => {
    const userId = await AsyncStorage.getItem('4');
  
    const data = {
      movie_id: movie_id,
      user_id: 4,
    };
  
    try {
      const response = await axios.post('http://192.168.0.105:3000/favorites', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  
    const favoritesString = await AsyncStorage.getItem('favorites');
    let favorites = favoritesString ? JSON.parse(favoritesString) : [];
  
    if (favorites.includes(movie_id)) {
      favorites = favorites.filter((id: number) => id !== movie_id);
    } else {
      favorites.push(movie_id);
    }
  
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  
    setIsFavorite(favorites.includes(movie_id));
    navigation.navigate('Favorites', {favorites});
  };
  


  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then((id) => {
        return setUserId(id);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressReview(movie_id, author)}>
        <Text style={[styles.button, {color: 'white'}]}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFavoritePress}>
        <Text style={[styles.button, {color: 'white'}]}>
          {isFavorite ? (
            <AntDesign name="heart" size={25} color="#8843E1" />
          ) : (
            <AntDesign name="hearto" size={25} color="#8843E1" />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default AddButtons;
