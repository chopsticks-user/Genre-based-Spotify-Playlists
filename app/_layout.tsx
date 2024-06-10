import { ThemeContextProvider } from '@/contexts/Theme';
import { Stack } from 'expo-router';

export default function AppLayout() {
    return (
        <ThemeContextProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </ThemeContextProvider>
    );
}
