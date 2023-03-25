import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const apiUrl = `https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=06e5af81859b7d0f87a8741091f5328e`;

const AddReview = ({ route }:any) => {
  const [ratingValue, setRatingValue] = useState('');
  const { movieId } = route.params;

  const sessionId = "a96bf5a8955303a6070e642d120903e2e8b6e44a";
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=06e5af81859b7d0f87a8741091f5328e`;
  
  const addReview = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`
        },
        body: JSON.stringify({
          value: ratingValue
        })
      });
  
      const data = await response.json();
      console.log('Review added successfully:', data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Review for Movie {movieId}</Text>
      <TextInput
        placeholder="Enter rating value"
        value={ratingValue}
        onChangeText={setRatingValue}
        style={{ borderWidth: 1, padding: 10, margin: 10, width: 200 }}
        keyboardType="numeric"
      />
      <Button title="Add Review" onPress={addReview} />
    </View>
  );
};

export default AddReview;
