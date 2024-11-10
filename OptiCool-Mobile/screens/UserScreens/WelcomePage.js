import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Use this hook

export default function WelcomePage() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <ImageBackground
      source={require('../../assets/opticool.png')}
      style={styles.container}
    >
      {/* Rounded box at the top */}
      <View style={styles.topBox}>
        <Image
          source={require('../../assets/elements1.png')}
          style={styles.elementsImage}
        />
      </View>

      {/* Header text */}
      <Text variant="headlineMedium" style={styles.headerText}>
        <Text style={styles.thinText}>Make Life </Text>
        <Text style={styles.boldText}>Easy</Text>
      </Text>

      {/* Buttons for navigation */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')} // Use the hook here
          style={[styles.button, { backgroundColor: 'white' }]}
          labelStyle={styles.buttonText}
        >
          Login
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')} // Use the hook here
          style={[styles.button, { backgroundColor: 'white' }]}
          labelStyle={styles.buttonText}
        >
          Sign Up
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBox: {
    position: 'absolute',
    top: 40,
    marginLeft: -60,
    left: '50%',
    transform: [{ translateX: -100 }],
    width: 320,
    height: 420,
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementsImage: {
    top: -30,
    width: 700,
    height: 330,
    resizeMode: 'contain',
    borderRadius: 55,
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 330,
    marginBottom: 50,
    color: '#050a20',
  },
  thinText: {
    fontWeight: '100',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  button: {
    margin: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#8ca2ac',
    letterSpacing: 3,
  },
});
