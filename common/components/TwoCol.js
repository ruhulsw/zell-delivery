import { Platform, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../colors/color';
import MyText from '../../components/Text';

const TwoCol = ({ id, name, icon, redirect }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate(redirect, { id: id })}
        >
            <View style={styles.roundedBox}>
                <View style={styles.icon}>
                    <MyText>{icon}</MyText>
                </View>
                <MyText style={styles.text}>{name}</MyText>
            </View>
        </Pressable>
    );
};

export default TwoCol;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        width: '45%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '2%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: COLOR.shadow,
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.1,
        elevation: 5,
    },
    roundedBox: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 20,
    },
    text: {
        color: 'black',
        fontSize: 13,
        fontWeight: '400',
        // fontFamily: 'Roboto',
        paddingLeft: 15,
        flex: 3,
    },
    icon: {
        flex: 1,
        paddingVertical: 7,
        paddingRight: 7,
        paddingLeft: 10,
        paddingTop: Platform.OS === 'ios' ? 12 : 7,
        borderRadius: 13,
    },
});
