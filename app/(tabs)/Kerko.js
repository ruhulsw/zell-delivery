import { StyleSheet, Text, View, Platform } from 'react-native';
import SearchScreen from '../../Screens/SearchScreen';
import { router } from 'expo-router';
import { COLOR } from '../../common/colors/color';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';
const Kerko = () => {
    return (
        <SmoothFeedAnimation>
            <View>
                {Platform.OS === 'ios' && <Text style={styles.Kerko}></Text>}
                <SearchScreen />
                <Text onPress={() => router.push('/BookView')}>
                    New Book View
                </Text>
                <Text
                    onPress={() =>
                        router.push({
                            pathname: '/HtmlViewer',
                            params: {
                                id: '123',
                                name: 'John Doe',
                            },
                        })
                    }
                >
                    New Book View Test
                </Text>
            </View>
        </SmoothFeedAnimation>
    );
};

export default Kerko;

const styles = StyleSheet.create({
    Kerko: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: COLOR.primary,
        padding: 15,
    },
});
