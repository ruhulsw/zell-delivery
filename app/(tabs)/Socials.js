import { StyleSheet, Text, Platform } from 'react-native';
import SocialsScreen from '../../Screens/SocialsScreen';
import { COLOR } from '../../common/colors/color';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';

const Socials = () => {
    return (
        <SmoothFeedAnimation>
            {Platform.OS === 'ios' && <Text style={styles.Socials}></Text>}
            <SocialsScreen />
        </SmoothFeedAnimation>
    );
};

export default Socials;

const styles = StyleSheet.create({
    Socials: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: COLOR.primary,
        padding: 15,
    },
});
