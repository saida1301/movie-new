import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_KEY } from '../services/urls';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isFocused]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      setSearchResults(response.data.results);

      if (response.data.results.length === 1) {
        navigation.navigate('Details', { id: response.data.results[0].id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTermChange = async (term: string) => {
    setSearchTerm(term);

    if (term.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${term}`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleMoviePress = (item: any) => {
    navigation.navigate('Details', { id: item.id });
  };
  

  const renderSearchResult = ({ item }:any) => (
    <TouchableOpacity  onPress={() => handleMoviePress(item)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row",alignItems: 'center'}}>
        <TextInput
          onChangeText={handleSearchTermChange}
          value={searchTerm}
          placeholder="Filmleri axtar"
          style={styles.searchBar}
        />
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <Text>Axtar</Text>
        </Pressable>
      </View>
  
      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
    marginRight:10,
  },
  searchButton: {
    height: 30,
    marginLeft:10,
  },
  container: {
    flex: 1,
    padding: 10,

  },
});
