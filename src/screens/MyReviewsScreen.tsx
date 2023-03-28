// AddReview.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MyReviewsScreen = ({ id }:any) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://192.168.0.105:3000/review/${id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id]);

  const renderItem = ({ item }:any) => (
    <View style={styles.review}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.date}>{item.created_at}</Text>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  review: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default MyReviewsScreen;
