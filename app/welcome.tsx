import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const WelcomeScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleAddTracks = () => {
    router.replace('/search');
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <LinearGradient
      colors={isDarkTheme ? ['#0F2027', '#203A43', '#2C5364'] : ['#42ABD2', '#D2E9F2']}
      style={styles.container}
    >
      <Text style={[styles.welcomeText, isDarkTheme && styles.darkText]}>Welcome to Playtify!</Text>
      <Text style={[styles.instructionText, isDarkTheme && styles.darkText]}>Add at least 5 tracks to get started</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddTracks}>
        <Text style={styles.buttonText}>Add Songs</Text>
      </TouchableOpacity>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, isDarkTheme && styles.darkText]}>Dark Theme</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
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
  switchContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  darkText: {
    color: '#D2E9F2',
  },
});

export default WelcomeScreen;
