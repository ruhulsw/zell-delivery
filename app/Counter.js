import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from '../components/Text';
import { COLOR } from '../common/colors/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounterScreen = () => {
    const [count, setCount] = useState(0);

    const saveData = async (count) => {
        try {
            await AsyncStorage.setItem('count', count);
        } catch (error) {}
    };
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('count');
            if (value !== null) {
                setCount(parseInt(value, 10));
            } else {
            }
        } catch (error) {}
    };
    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('count');
        } catch (error) {}
    };
    const increment = async () => {
        const val = count + 1;
        await setCount(val);
        await AsyncStorage.setItem('count', val.toString());
    };

    const decrement = async () => {
        const val = count - 1;
        await AsyncStorage.setItem('count', val.toString());
        await setCount(val);
    };

    const reset = async () => {
        await AsyncStorage.setItem('count', '0');
        await setCount(0);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <MyText h2 style={styles.counterText}>
                    {count}
                </MyText>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.decrementButton}>
                    <MyText style={styles.text} onPress={decrement}>
                        {' '}
                        -{' '}
                    </MyText>
                </View>
                <View style={styles.resetButton}>
                    <MyText style={styles.text} onPress={reset}>
                        {' '}
                        0{' '}
                    </MyText>
                </View>
                <View style={styles.incrementButton}>
                    <MyText style={styles.text} onPress={increment}>
                        {' '}
                        +{' '}
                    </MyText>
                </View>
            </View>
        </View>
    );
};

export default CounterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    counterContainer: {
        padding: 120,
        borderRadius: 140,
        marginBottom: 0,
    },
    counterText: {
        color: 'black',
        fontSize: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    incrementButton: {
        borderRadius: 100,
        backgroundColor: COLOR.secondary,
    },
    decrementButton: {
        borderRadius: 100,
        backgroundColor: COLOR.secondary,
    },
    resetButton: {
        borderRadius: 100,
        backgroundColor: COLOR.secondary,
    },
    text: {
        padding: 30,
        color: 'white',
        fontSize: 15,
    },
});
