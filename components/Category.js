import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { COLOR } from '../common/colors/color';
import MyText from './Text';

function Category({ name, icon, redirect, subCategory }) {
    return (
        <Pressable
            style={styles.container}
            onPress={() =>
                router.push({
                    pathname: redirect,
                    params: { subCategory: JSON.stringify(subCategory) },
                })
            }
        >
            <View style={styles.roundedBox}>
                <View style={styles.icon}>
                    <MyText>{icon}</MyText>
                </View>
                <MyText style={styles.text}>{name}</MyText>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        width: '45%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '2%',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: COLOR.shadow,
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.2,
        elevation: 5,
    },
    roundedBox: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 15,
    },
    text: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 11,
        flex: 3,
    },
    icon: {
        flex: 1,
        backgroundColor: COLOR.light,
        padding: 10,
        paddingTop: 12,
        paddingLeft: 12,
        borderRadius: 13,
    },
});

export default Category;
