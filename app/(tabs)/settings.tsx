import { StyleSheet, Text, View, Image, Button, Pressable, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { MutableRefObject, useRef } from 'react'
import { Link, router } from 'expo-router';
import { UserProfile, getUserProfile } from '@/spotify';
import { ScrollView } from 'react-native';
import { useUserProfile } from '@/hooks';
import { settingsMenu } from '@/constants/SettingsMenu';

/* <Link href='/settings/profile' asChild>
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
                </Link> */
/* <View style={styles.profileEditButton}>
                                <FontAwesome6 name="feather-pointed" size={15} color="black" />
                            </View> */

export default function Settings() {
    const userProfile: UserProfile = useUserProfile();

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.profile}>
                    <TouchableOpacity onPress={() => {
                        console.log('pressed');
                    }}>
                        <View style={styles.profileAvatarWrapper}>
                            <Image
                                style={styles.profileAvatar}
                                source={require('@/assets/images/react-logo-black.jpg')}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.profileName}>{userProfile.display_name}</Text>
                    <Text style={styles.profileEmail}>{userProfile.email}</Text>
                </View>
                {settingsMenu.sections.map(({ header, items }) => {
                    return (
                        <View key={header} style={styles.section}>
                            <Text style={styles.sectionHeader}>{header}</Text>
                            <View style={styles.sectionItemWrapper}>

                                {items.map(({ label, icon, color, type }) => {
                                    return (
                                        <TouchableOpacity
                                            key={label}
                                            onPress={() => {
                                                console.log(`${label} ${icon} ${type}`);
                                            }}
                                        >
                                            <View style={styles.sectionItem}>
                                                <View style={[styles.sectionItemIcon, { backgroundColor: color }]}>
                                                    {icon}
                                                </View>
                                                <Text style={styles.sectionItemLabel}>{label}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    );
                })}
            </SafeAreaView >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 25,
        paddingHorizontal: 15,
    },
    section: {
        paddingHorizontal: 10,
    },
    sectionHeader: {
        paddingTop: 25,
        paddingBottom: 20,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    sectionItemWrapper: {
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#262626',
        marginVertical: 5,
        height: 40,
        borderRadius: 10,
    },
    sectionItemLabel: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '400',
        marginHorizontal: 10,
    },
    sectionItemIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        // backgroundColor: 'green',
        height: 30,
        width: 30,
        borderRadius: 10000,
    },
    profile: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    profileEmail: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        color: '#ECEDEE',
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});