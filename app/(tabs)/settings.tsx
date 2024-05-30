import { StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import { UserProfile, getUserProfile } from '@/spotify';
import { ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useUserProfile } from '@/hooks';

interface SettingsButton {
    id: string,
    icon: string,
    color: string,
    label: string,
    type: 'toggle' | 'link',
};
interface SettingsSection {
    header: string,
    icon: string,
    items: SettingsButton[],
};

interface SettingsMenu {
    sections: SettingsSection[],
};

const menu: SettingsMenu = {
    sections: [
        {
            header: 'PREFERENCES',
            icon: 'settings',
            items: [
                {
                    id: 'Themes',
                    icon: 'feather-moon',
                    color: 'black',
                    label: 'Dark mode',
                    type: 'toggle',
                },
            ]
        },
        {},
    ]
};

export default function Settings() {
    const userProfile: UserProfile = useUserProfile();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.profile}>
                    <TouchableOpacity onPress={() => {
                        console.log('pressed');
                    }}>
                        <View style={styles.profileAvatarWrapper}>
                            <Image
                                style={styles.profileAvatar}
                                source={require('@/assets/images/react-logo.png')}
                            />
                            {/* <View style={styles.profileEditButton}>
                                <FontAwesome6 name="feather-pointed" size={15} color="black" />
                            </View> */}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.profileName}>{userProfile.display_name}</Text>
                    <Text style={styles.profileEmail}>{userProfile.email}</Text>
                </View>
                <Link href='/settings/profile' asChild>
                    <Pressable >
                        <Text style={styles.text}>My profile</Text>
                    </Pressable>
                </Link>
                <Link href='/settings/recommendations' asChild>
                    <Pressable >
                        <Text style={styles.text}>Recommendations</Text>
                    </Pressable>
                </Link>
                <Link href='/settings/logout'>
                    <Pressable onPress={() => {
                        router.replace('/');
                    }}>
                        <Text style={styles.text}>Log out</Text>
                    </Pressable>
                </Link>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
    },
    profile: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 10000,
        borderWidth: 2,
        borderColor: '#ECEDEE',
        backgroundColor: 'yellow',
    },
    profileAvatarWrapper: {
        position: 'relative',
    },
    profileEditButton: {
        width: 20,
        height: 20,
        borderRadius: 10000,
        backgroundColor: 'pink',
        top: -15,
        left: 45,
    },
    profileName: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#ECEDEE',
        // backgroundColor: 'red',
    },
    profileEmail: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        color: '#ECEDEE',
        // backgroundColor: 'blue',
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});