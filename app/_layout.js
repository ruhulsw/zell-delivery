import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-get-random-values';
import { SavePageProvider } from '../common/context/SavePageContext';
import { StatusBar, Platform } from 'react-native';
import { COLOR } from '../common/colors/color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
        PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
        SawarabiMincho: require('../assets/fonts/SawarabiMincho-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SavePageProvider>
                {Platform.OS === 'android' && (
                    <StatusBar
                        backgroundColor={COLOR.primary}
                        barStyle="dark-content"
                    />
                )}
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Collection"
                        options={{ headerShown: true, title: 'Koleksione' }}
                    />
                    <Stack.Screen
                        name="Library"
                        options={{ headerShown: true, title: 'Libraria' }}
                    />
                    <Stack.Screen
                        name="Artikuj"
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="Family"
                        options={{ headerShown: true, title: 'Familja' }}
                    />
                    <Stack.Screen
                        name="FamilyCollection"
                        options={{
                            headerShown: true,
                            title: 'Familja Artikuj',
                        }}
                    />
                    <Stack.Screen
                        name="FamilyArticles"
                        options={{ headerShown: true, title: 'Artikuj' }}
                    />
                    <Stack.Screen
                        name="Article"
                        options={{ headerShown: true, title: 'Artikuj' }}
                    />
                    <Stack.Screen
                        name="PrayerScreen"
                        options={{ headerShown: true, title: 'Lutje' }}
                    />
                    <Stack.Screen name="Pdf" options={{ headerShown: true }} />
                    <Stack.Screen
                        name="Counter"
                        options={{ headerShown: true, title: 'Numeratori' }}
                    />
                    <Stack.Screen
                        name="Calendar"
                        options={{ headerShown: true, title: 'Kalendari' }}
                    />

                    {/* <Stack.Screen
                    name="BookView"
                    options={{ headerShown: false, title: 'BookView' }}
                />
                <Stack.Screen
                    name="BookViewTest"
                    options={{ headerShown: true, title: 'BookViewTest' }}
                /> */}
                    <Stack.Screen
                        name="HtmlSavePageView"
                        options={{
                            headerShown: false,
                            title: 'HtmlSavePageView',
                        }}
                    />
                    <Stack.Screen
                        name="HtmlViewer"
                        options={{ headerShown: false, title: 'HtmlViewer' }}
                    />
                </Stack>
            </SavePageProvider>
        </GestureHandlerRootView>
    );
}
