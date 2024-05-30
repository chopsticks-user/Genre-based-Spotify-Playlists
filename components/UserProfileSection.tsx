import { UserProfile, session } from '@/spotify';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'


interface UserProfileSectionProps {
    profile: UserProfile
}


export default function UserProfileSection(props: UserProfileSectionProps) {
    return (
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
            <Text style={styles.profileName}>{props.profile?.display_name}</Text>
            <Text style={styles.profileEmail}>{props.profile?.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
});