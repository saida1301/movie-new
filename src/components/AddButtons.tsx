import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AddButtons = ({movieId, onPressReview}: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const handleFavoritePress = async () => {
    const favoritesString = await AsyncStorage.getItem('favorites');
    let favorites = favoritesString ? JSON.parse(favoritesString) : [];

    if (favorites.includes(movieId)) {
      favorites = favorites.filter((id: number) => id !== movieId);
    } else {
      favorites.push(movieId);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

    setIsFavorite(!isFavorite);

    navigation.navigate("Favorites", {favorites});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressReview(movieId)}>
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
