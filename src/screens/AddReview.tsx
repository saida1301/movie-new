import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Animated, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import SuccessAnimation from '../animations/success.json';
import { borderRadius, colors, fontSizes, spacing } from '../assets/themes';
import SimilarMovies from '../components/SimilarMovies';


type Props = {
  route: any;
  isVisible: boolean;
  onClose: () => void;
};

const AddReview = ({ route }: Props) => {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const { movie_id, author, movie_title} = route.params;

  console.log("route.params", route.params);


  const postReview = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.105:3000/reviews',
        { movie_id, author, content , movie_title},
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
      <Image
        source={require('../assets/images/launch_screen.png')}
        style={styles.image}
      />

      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Yorumunuzu girin"
        style={styles.input}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={postReview}>
        <Text style={styles.buttonText}>Gönder</Text>
      </TouchableOpacity>

      <View style={styles.box}>
        <SimilarMovies movieId={movie_id} />
      </View>
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
    padding: spacing.large,
    backgroundColor: colors.gray[800],

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: borderRadius.small,
    padding: spacing.medium,
    marginBottom: spacing.large,
    color: colors.gray[100],
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
    padding: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.gray[100],
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
    color: colors.black,
  },
  modalButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
    padding: spacing.medium,
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
    backgroundColor: colors.white,
    borderRadius: borderRadius.small,
    padding: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: colors.white,
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  animation: {
    width: 150,
    height: 150,
  },
box: {
    flex: 1,
    backgroundColor: colors.gray[800],
    borderRadius: borderRadius.small,
    marginTop: spacing.xxlarge,
  },
});




export default AddReview;