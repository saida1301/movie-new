import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
} from 'react-native';
import axios from 'axios';

import {Modal} from 'react-native-paper';
import {borderRadius, colors, fontSizes, spacing} from '../assets/themes';

const MyReviewsScreen = ({id}: any) => {
  const [reviews, setReviews] = useState<{id: number}[]>([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setNewContent] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(id);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://192.168.0.105:3000/review/user/Saidam`)
      .then(response => setReviews(response.data))
      .catch(error => setError(error));
  }, []);

  const editReview = (reviewId: React.SetStateAction<null>) => {
    axios
      .put(`http://192.168.0.105:3000/review/user/Saidam/${selectedReviewId}`, {
        content: content,
      })
      .then(response => {
        axios
          .get(`http://192.168.0.105:3000/review/user/Saidam`)
          .then(response => setReviews(response.data))
          .catch(error => setError(error));
      })
      .catch(error => setError(error));
    setModalVisible(false);
    setEditingReviewId(reviewId);
  };

  const deleteReview = (id: number) => {
    axios
      .delete(`http://192.168.0.105:3000/review/user/Saidam/${id}`)
      .then(response => {
        console.log(response.data);
        setReviews(prevReviews => prevReviews.filter(r => r.id !== id));
      })
      .catch(error => console.log(error));
  };

  const renderItem = ({item}: any) => (
    <View style={styles.review}>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => {
            setSelectedReviewId(item.id);
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteReview(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={reviews}
        renderItem={renderItem}
        id={selectedReviewId}
      />

      <Modal visible={modalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Edit Review</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter new review content"
            multiline
            placeholderTextColor={'#ccc'}
            onChangeText={text => setNewContent(text)}
            value={content}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => editReview()}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.black,
  },
  review: {
    padding: spacing.medium,
    marginVertical: spacing.medium,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.small,
    justifyContent: 'center',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: spacing.small,
    color: colors.white,
    alignSelf: 'center',
  },
  content: {
    fontSize: fontSizes.medium,
    color: colors.black,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.medium,
  },
  button: {
    padding: spacing.small,
    borderRadius: borderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.small,
    minWidth: 80,
  },
  editButton: {
    backgroundColor: '#3F51B5',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  modal: {
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.small,
    padding: spacing.medium,
    margin: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
    color: colors.black,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.gray[600],
    borderRadius: borderRadius.small,
    padding: spacing.small,
    marginBottom: spacing.medium,
    height: '50%',
    width: '100%',
    textAlignVertical: 'top',
    color: colors.black,
    flexWrap: 'nowrap',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default MyReviewsScreen;
