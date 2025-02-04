import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {CATEGORIES} from "../datas/Categories";
import Category from "../components/Category";
import {COLOR} from "../common/colors/color";
import NextPrayerTime from "../components/NextPrayerTime";
import {LocationProvider} from "../common/context/LocationContext";


function HomeScreen() {
    const renderItem = ({item}) => (
        <Category name={item.name} icon={item.icon} redirect={item.redirect}/>
    );
    StatusBar.setBarStyle('light-content'); // Change text color

    return (
        <LocationProvider>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="dark-content" // For Android, set the text color to white
                    animated // Enable animated changes based on background color (iOS)
                />
                <View style={styles.namazTime}>
                    <NextPrayerTime/>
                </View>
                <View style={styles.categories}>
                    <FlatList
                        data={CATEGORIES}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        style={styles.content}
                    />
                </View>
            </View>
        </LocationProvider>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    namazTime: {
        height: '40%',
        width: '100%'
    },
    categories: {
        flex: 1,
        height: '60%',
        width: '100%',
        alignItems: 'space-around',
        backgroundColor: COLOR.background,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    content: {
        paddingVertical: 30
    },
    container: {
        flex: 1, // Each half-screen takes an equal amount of space
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        backgroundColor: COLOR.primary
    }
});
