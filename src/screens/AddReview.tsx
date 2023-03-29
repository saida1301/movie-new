import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';


const AddReview = ({ route }) => {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

const handleLogin = (userData: React.SetStateAction<null>) => {
  setCurrentUser(userData);
};

  const { movie_id, author_id } = route.params;
 
  const postReview = async () => {
    try {
      const response = await fetch('http://192.168.0.105:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie_id, author: author_id, content }),
      });
  
     if (!response.ok) {
        throw new Error('Something went wrong');
      }
  
      const data = await response.json();
      console.log(data);
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Enter your review"
        style={styles.input}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={postReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Review added successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsSuccessModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent:"center",
    backgroundColor:"#1c1c1c"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0080ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0080ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})


export default AddReview;