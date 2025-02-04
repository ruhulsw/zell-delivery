import { StyleSheet, View } from 'react-native';
import QiblaCompass from '../common/components/QiblaCompass';

export default function QiblaScreen() {
    return (
        <View style={styles.container}>
            <QiblaCompass
                color={'#123'}
                backgroundColor={'#fff'}
                textStyles={{ textAlign: 'center', fontSize: 24 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingVertical: '25%',
        backgroundColor: '#fff',
    },
});
