import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export const settingsMenuIcons = {
    languages: <MaterialIcons name='language' size={20} color='white' />,
    themes: <Feather name="moon" size={20} color="white" />,
    playlists: <MaterialCommunityIcons name="playlist-edit" size={20} color="white" />,
    sync: <Ionicons name="sync-outline" size={20} color="white" />,
    reportBugs: <Octicons name="report" size={18} color="white" />,
    requestFeatures: <Ionicons name="git-pull-request-outline" size={20} color="white" />,
    contactUs: <Feather name="mail" size={20} color="white" />,
    switchAccount: <MaterialIcons name="switch-account" size={20} color="white" />,
    signOut: <MaterialIcons name="logout" size={20} color="white" />,
}