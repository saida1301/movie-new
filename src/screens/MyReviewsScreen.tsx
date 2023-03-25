import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../services/urls';

const MyReviewsScreen = ({ userId }: any) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/account/${userId}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc`)
      .then(response => {
        setReviews(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reviews</Text>
      {reviews.map(review => (
        <View key={review.id} style={styles.review}>
          <Text style={styles.movieTitle}>{review.title}</Text>
          <Text style={styles.reviewContent}>{review.content}</Text>
          <Text style={styles.rating}>Rating: {review.rating}/10</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  review: {
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  reviewContent: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: 'white',
  },
});

export default MyReviewsScreen;
