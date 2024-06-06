import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const WelcomeScreen = () => {
  const handleAddTracks = () => {
    router.replace('/search');
  };

  return (
    <LinearGradient
      colors={['#42ABD2', '#D2E9F2']}
      style={styles.container}
    >
      <Text style={styles.welcomeText}>Welcome to Playtify!</Text>
      <Text style={styles.instructionText}>Add at least 5 tracks to get started</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddTracks}>
        <Text style={styles.buttonText}>Add Songs</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00BAFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
