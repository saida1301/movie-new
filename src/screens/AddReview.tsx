import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { API_KEY } from '../services/urls';

const AddReview = ({ route }: any) => {
  const [ratingValue, setRatingValue] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const { movieId } = route.params;

  const sessionId = "a96bf5a8955303a6070e642d120903e2e8b6e44a";
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
  
  const addReview = async () => {
    try {
      const response = await axios.post(apiUrl, {
        value: ratingValue,
        review: reviewMessage
      });
  
      console.log('Review added successfully:', response.data);
    } catch (error) {
      console.error('Error adding review:', error.response);

    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Review for Movie {movieId}</Text>
      <TextInput
        placeholder="Enter rating value"
        value={ratingValue}
        onChangeText={setRatingValue}
        style={{ borderWidth: 1, padding: 10, margin: 10, width: 350 }}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Enter review message"
        value={reviewMessage}
        onChangeText={setReviewMessage}
        style={{ borderWidth: 1, padding: 10, margin: 10, width: 350, height: 100 }}
      />
      <Button title="Add Review" onPress={addReview} />
    </View>
  );
};

export default AddReview;
