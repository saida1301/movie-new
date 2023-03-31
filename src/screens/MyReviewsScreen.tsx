import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

const MyReviewsScreen = ({userName}: any) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://192.168.0.105:3000/review/user/Saida`)
      .then(response => setReviews(response.data))
      .catch(error => setError(error));
  }, [userName]);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const renderItem = ({item}: any) => (
    <View style={styles.review}>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  review: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: 'black',
    justifyContent: 'center',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  content: {
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,

  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyReviewsScreen;
