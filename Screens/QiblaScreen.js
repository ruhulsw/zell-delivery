import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import QiblaCompass from '../common/components/QiblaCompass';
import QiblaCompass1 from '../common/components/QiblaCompass2';
import { LinearGradient } from 'expo-linear-gradient';

export default function QiblaScreen() {
    const [compassStyle, setCompassStyle] = useState('styleOne');
    return (
        <LinearGradient
            colors={[
                compassStyle === 'styleOne' ? '#00B4A9' : '#AAE5E1',
                compassStyle === 'styleOne' ? '#FAFEFD' : '#fff',
            ]}
            start={{ x: 0.4, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            {compassStyle === 'styleOne' ? <QiblaCompass1 /> : <QiblaCompass />}

            <View style={styles.changeCompass}>
                <TouchableOpacity
                    style={styles.CompassItem}
                    onPress={() => setCompassStyle('styleOne')}
                >
                    <Text style={styles.CompassItemTxt}>Minimal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.CompassItem}
                    onPress={() => setCompassStyle('styleTwo')}
                >
                    <Text style={styles.CompassItemTxt}>Ornate</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingVertical: '25%',
    },
    changeCompass: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        zIndex: 2,
    },
    CompassItem: {
        backgroundColor: '#B4E9E6',
        padding: 10,
        borderRadius: 20,
        width: '40%',
    },
    CompassItemTxt: {
        color: '#123',
        textAlign: 'center',
        fontSize: 16,
    },
});
