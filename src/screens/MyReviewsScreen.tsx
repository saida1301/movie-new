import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';

import {Modal} from 'react-native-paper';

const MyReviewsScreen = ({userName}: any) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState('');

  useEffect(() => {
    axios
      .get(`http://192.168.0.105:3000/review/user/Saida`)
      .then(response => setReviews(response.data))
      .catch(error => setError(error));
  }, [userName]);

  const editReview = (reviewId:any) => {
    axios
      .put(`http://192.168.0.105:3000/review/${reviewId}`, {
        content: newContent,
      })
      .then((response) => {
        axios
          .get(`http://192.168.0.105:3000/review/user/Saida`)
          .then((response) => setReviews(response.data))
          .catch((error) => setError(error));
      })
      .catch((error) => setError(error));
    setModalVisible(false);
  };
  

  const deleteReview = (reviewId: any) => {
    axios
      .delete(`http://192.168.0.105:3000/review/${reviewId}`)
      .then(response => {
        console.log(response.data);
        setReviews(prevReviews => prevReviews.filter(r => r.id !== reviewId));
      })
      .catch(error => console.log(error));
  };

  const renderItem = ({item}: any) => (
    <View style={styles.review}>
      <Text style={styles.author}>{item.author}</Text>
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
  onPress={() => deleteReview(item.id)}
>
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

      <Modal visible={modalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Edit Review</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter new review content"
            multiline
            placeholderTextColor={'#ccc'}
            onChangeText={text => setNewContent(text)}
            value={newContent}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={editReview}>
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
    padding: 10,
    backgroundColor: 'black',
  },
  review: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    alignSelf: 'center',
  },
  content: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
    height: '50%',
    width: '100%',
    textAlignVertical: 'top',
    color: 'black',
    flexWrap: 'nowrap',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default MyReviewsScreen;
