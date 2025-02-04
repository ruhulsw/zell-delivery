import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
    Text,
    Alert,
} from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

const KaabaCoordinates = { lat: 21.4225, lng: 39.8262 };

const QiblaCompass = () => {
    const [heading, setHeading] = useState(0);
    const [qiblaDirection, setQiblaDirection] = useState(0);
    const [directionText, setDirectionText] = useState('');
    const rotationAnim = useRef(new Animated.Value(0)).current;

    const applyLowPassFilter = (newValue, oldValue, alpha = 0.1) => {
        return oldValue * (1 - alpha) + newValue * alpha;
    };

    const calculateDirection = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'Veri Lindje';
        } else if (degree >= 67.5 && degree < 112.5) {
            return 'Lindje';
        } else if (degree >= 112.5 && degree < 157.5) {
            return 'Jug Lindje';
        } else if (degree >= 157.5 && degree < 202.5) {
            return 'Jug';
        } else if (degree >= 202.5 && degree < 247.5) {
            return 'Jug Perendim';
        } else if (degree >= 247.5 && degree < 292.5) {
            return 'Perendim';
        } else if (degree >= 292.5 && degree < 337.5) {
            return 'Veri Perendim';
        } else {
            return 'Veri';
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Denied',
                    'Location permission is required to calculate Qibla.'
                );
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            const deltaLong =
                (KaabaCoordinates.lng - loc.coords.longitude) * (Math.PI / 180);
            const userLat = loc.coords.latitude * (Math.PI / 180);
            const kaabaLat = KaabaCoordinates.lat * (Math.PI / 180);

            const angle = Math.atan2(
                Math.sin(deltaLong) * Math.cos(kaabaLat),
                Math.cos(userLat) * Math.sin(kaabaLat) -
                    Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLong)
            );

            const direction = (angle * (180 / Math.PI) + 360) % 360;
            setQiblaDirection(direction);
        })();

        Magnetometer.setUpdateInterval(100);
        const subscription = Magnetometer.addListener((data) => {
            let { x, y } = data;
            let magnetometerHeading = Math.atan2(y, x) * (180 / Math.PI);
            if (magnetometerHeading < 0) magnetometerHeading += 360;
            setHeading((prev) => {
                const filteredHeading = applyLowPassFilter(
                    Math.round(magnetometerHeading),
                    prev
                );
                setDirectionText(
                    calculateDirection(Math.round(filteredHeading))
                );
                return Math.round(filteredHeading);
            });
        });

        return () => subscription && subscription.remove();
    }, []);
    console.log('heading', heading);
    useEffect(() => {
        const angle = calculateQiblaAngle();
        Animated.timing(rotationAnim, {
            toValue: angle,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [heading, qiblaDirection]);

    const calculateQiblaAngle = () => {
        let angle = qiblaDirection - heading;
        if (angle < 0) angle += 360;
        return angle;
    };

    const rotation = rotationAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.directionText}>{directionText}</Text>
            <Text style={styles.directionNum}>{heading}°</Text>
            <Image
                source={require('../../assets/myImages/new_pointer.png')}
                style={styles.fixedBackground}
            />
            <View style={styles.compassContainer}>
                <Animated.Image
                    source={require('../../assets/myImages/new_compass_dial.png')}
                    style={[
                        styles.compassImage,
                        {
                            transform: [{ rotate: rotation }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionText: {
        position: 'absolute',
        top: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        zIndex: 4,
    },
    directionNum: {
        position: 'absolute',
        top: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        zIndex: 4,
    },
    fixedBackground: {
        position: 'absolute',
        width: Dimensions.get('window').width * 2.1,
        height: Dimensions.get('window').width * 2.1,
        resizeMode: 'contain',
        zIndex: 1,
    },
    compassContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        zIndex: 2,
    },
    compassImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default QiblaCompass;
