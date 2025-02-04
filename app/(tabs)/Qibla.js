import QiblaScreen from '../../Screens/QiblaScreen';
import { COLOR } from '../../common/colors/color';
import { Text, Platform } from 'react-native';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';

const Qibla = () => {
    return (
        <SmoothFeedAnimation>
            {Platform.OS === 'ios' && (
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        backgroundColor: COLOR.primary,
                        padding: 15,
                    }}
                ></Text>
            )}
            <QiblaScreen />
        </SmoothFeedAnimation>
    );
};

export default Qibla;
