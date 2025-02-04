import { StyleSheet, Text, View, Platform } from 'react-native';
import NamazScreen from '../../Screens/NamazScreen';
import { COLOR } from '../../common/colors/color';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';
const Namaz = () => {
    return (
        <SmoothFeedAnimation>
            <View>
                {Platform.OS === 'ios' && <Text style={styles.Namaz}></Text>}
                <NamazScreen />
            </View>
        </SmoothFeedAnimation>
    );
};

export default Namaz;

const styles = StyleSheet.create({
    Namaz: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: COLOR.primary,
        padding: 15,
    },
});
