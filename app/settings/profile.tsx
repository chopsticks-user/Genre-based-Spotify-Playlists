import { StyleSheet, Text, Image, Pressable, SafeAreaView } from 'react-native'
import { Link } from 'expo-router';
import { useWebBrowser, WebBrowserOpenAction } from '@/hooks/useWebBrowser';
import useSession from '@/hooks/useSession';

export default function Profile() {
    const {userProfile: userProfile} = useSession();
    const webBrowserOpenAction: WebBrowserOpenAction = useWebBrowser();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Country: {userProfile.country}</Text>
            <Text style={styles.text}>Display name: {userProfile.display_name}</Text>
            <Text style={styles.text}>Email: {userProfile.email}</Text>
            <Text style={styles.text}>{"Spotify URL: "}
                {<Link href={userProfile.external_urls.spotify}>
                    <Pressable onPress={async () => {
                        await webBrowserOpenAction(userProfile.external_urls.spotify)
                    }}>
                        <Text style={styles.text}>{userProfile.external_urls.spotify}</Text>
                    </Pressable>
                </Link>}
            </Text>
            <Text style={styles.text}>Spotify ID: {userProfile.id}</Text>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151718'
    },
    text: {
        color: '#ECEDEE',
        fontSize: 15,
        fontWeight: '500',
    },
});
