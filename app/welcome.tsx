import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const WelcomeScreen = () => {
  const handleGetStarted = () => {
    router.replace('/search');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Playtify!</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
