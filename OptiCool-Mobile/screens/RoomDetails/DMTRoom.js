import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DMTRoom = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/room1.jpg' }}
        style={styles.image}
      />
      <Text style={styles.text}>Detailed information about Room 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DMTRoom;
