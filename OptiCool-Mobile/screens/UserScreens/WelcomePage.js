import React, { useRef } from 'react';
import { View, StyleSheet, ImageBackground, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Use this hook

export default function WelcomePage() {
  const navigation = useNavigation(); // Initialize navigation
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial value for scale: 1

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (route) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(route);
    });
  };

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
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={() => handlePressOut('Login')}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <Button
              mode="contained"
              style={{ backgroundColor: 'white' }}
              labelStyle={styles.buttonText}
            >
              Login
            </Button>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={() => handlePressOut('Register')}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <Button
              mode="contained"
              style={{ backgroundColor: 'white' }}
              labelStyle={styles.buttonText}
            >
              Sign Up
            </Button>
          </Animated.View>
        </TouchableWithoutFeedback>
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
    borderRadius: 75, // Increased borderRadius for more rounded corners
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
