import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface SplashScreenProps {
    onLoadingComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadingComplete }) => {
    useEffect(() => {
        setTimeout(() => {
            onLoadingComplete();
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/playtifylogosolo.jpg')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001229',
    },
    logo: {
        width: 220,
        height: 150,
    },
});

export default SplashScreen;