import { useWebBrowser } from '@/hooks/useWebBrowser';
import { UserProfile } from '@/spotify';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'


export interface UserProfileSectionProps {
    profile: UserProfile
}

function userProfileImageSource(profile: UserProfile): ImageSourcePropType | undefined {
    if (profile.images.length === 0) {
        return require('@/assets/images/avatar-default.png');
    }
    return { uri: profile.images[0].url };
}

export default function UserProfileSection(props: UserProfileSectionProps) {
    const webBrowserOpen = useWebBrowser();

    return (
        <View style={styles.profile}>
            <TouchableOpacity onPress={() => {
                webBrowserOpen(props.profile.external_urls.spotify);
            }}>
                <View style={styles.profileAvatarWrapper}>
                    <Image
                        style={styles.profileAvatar}
                        source={
                            userProfileImageSource(props.profile)
                        }
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
        backgroundColor: 'black',
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