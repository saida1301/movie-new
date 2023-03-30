import axios from 'axios';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

import SuccessAnimation from '../animations/success.json';

type Props = {
  route: any;
  isVisible: boolean;
  onClose: () => void;
};

const AddReview = ({ route, isVisible, onClose }: Props) => {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = (userData: React.SetStateAction<null>) => {
    setCurrentUser(userData);
  };

  const { movie_id, author } = route.params;

  console.log("route.params", route.params);

  const postReview = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.105:3000/reviews',
        { movie_id, author, content },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (!response.status === 200) {
        throw new Error('Something went wrong');
      }
  
      const data = response.data;
      console.log(data);
  
      setIsSuccessModalVisible(true);
      setTimeout(() => {
        setIsSuccessModalVisible(false);
           setContent('');

      }, 1000); 
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
      <Modal visible={isSuccessModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <LottieView
              source={SuccessAnimation}
              style={styles.animation}
              autoPlay={true}
              loop={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
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
    color: '#000',
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
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  animation: {
    width: 150,
    height: 150,
  },

});




export default AddReview;