import { Image, StyleSheet, Text, View } from "react-native";


const MovieCard = ({movie}:any) => {

    return (
<View style={styles.baseContainer}>
        <View style={styles.container}>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.details}>
                <Text style={styles.title}>{movie.title}</Text>
                {/* <Text style={styles.title}>{moment(movie.release_date).format('MMMM DD, YYYY')}</Text> */}
            </View>
        </View>
        </View>

    );
  };
  

  const styles = StyleSheet.create({
    baseContainer: {
      flex: 1,
      backgroundColor: "black",
      width: "100%",
 height: "100%",
    },
    container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      backgroundColor:"black",
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 80,
      height: 120,
      marginRight: 10,
    },
    details: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color:"white"
    },
  });
  

export default MovieCard;
