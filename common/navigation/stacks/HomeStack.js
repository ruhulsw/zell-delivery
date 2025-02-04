import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../../../Screens/HomeScreen";
import RisaleScreen from "../../../Screens/Risale/RisaleScreen";
import RisaleCollectionScreen from "../../../Screens/Risale/RisaleCollectionScreen";
import CollectionScreen from "../../../Screens/CollectionScreen";
import LibraryScreen from "../../../Screens/LibraryScreen";
import PrayerScreen from "../../../Screens/PrayerScreen";
import FamilyScreen from "../../../Screens/Family/FamilyScreen";
import FamilyArticlesScreen from "../../../Screens/Family/FamilyArticlesScreen";
import ArticleScreen from "../../../Screens/ArticleScreen";
import PdfScreen from "../../../Screens/PdfScreen";
import {StatusBar} from "react-native";
import CounterScreen from "../../../Screens/CounterScreen";
import CalendarScreen from "../../../Screens/CalendarScreen";
import FamilyCollectionScreen from "../../../Screens/Family/FamilyCollectionScreen";

const Stack = createStackNavigator();

function HomeStack() {
    StatusBar.setBarStyle('dark-content'); // Change text color

    return (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Risale" component={RisaleScreen} />
            <Stack.Screen name="RisaleCollection" component={RisaleCollectionScreen} options={{title: 'Risale'}} />
            <Stack.Screen name="Collection" component={CollectionScreen}  options={{title: 'Koleksione'}} />
            <Stack.Screen name="Library" component={LibraryScreen}  options={{title: 'Libraria'}}/>
            <Stack.Screen name="Artikuj" component={ArticleScreen} />
            <Stack.Screen name="Namaz" component={PrayerScreen} />
            <Stack.Screen name="Family" component={FamilyScreen}  options={{title: 'Familja'}} />
            <Stack.Screen name="FamilyCollection" component={FamilyCollectionScreen}  options={{title: 'Familja Artikuj'}} />
            <Stack.Screen name="FamilyArticles" component={FamilyArticlesScreen}  options={{title: 'Artikuj'}} />
            <Stack.Screen name="Article" component={ArticleScreen}  options={{title: 'Artikuj'}}/>
            <Stack.Screen name="PrayerScreen" component={PrayerScreen}  options={{title: 'Lutje'}} />
            {/*<Stack.Screen name="Namaz" component={NamazScreen}  options={{title: 'Namaz'}} />*/}
            <Stack.Screen name="Pdf" component={PdfScreen}  options={{title: ''}}/>
            <Stack.Screen name="Counter" component={CounterScreen}  options={{title: 'Numeratori'}}/>
            <Stack.Screen name="Calendar" component={CalendarScreen}  options={{title: 'Kalendari'}}/>
        </Stack.Navigator>
    )
}

export default HomeStack;

const defaultScreenOptions = {
    headerBackTitle: 'Back',
    headerTitleStyle: {
        fontFamily: 'PoppinsRegular'
    },
    headerBackTitleStyle: {
        fontFamily: 'PoppinsRegular'
    },
    backgroundColor: 'white' ,
    headerShadowVisible: false,
};