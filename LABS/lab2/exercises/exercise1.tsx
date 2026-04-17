import { Image, StyleSheet, View } from 'react-native';

function Avatar({ source, size = 50 }) {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#ddd',

    },
    image: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
}

export default Avatar;