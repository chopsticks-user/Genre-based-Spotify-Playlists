import { ThemeContextProvider } from '@/contexts/Theme';
import { SessionProvider } from '@/contexts/SessionProvider';
import { Stack } from 'expo-router';

export default function AppLayout() {
    return (
        <SessionProvider>
            <ThemeContextProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </ThemeContextProvider>
        </SessionProvider>
    );
}
