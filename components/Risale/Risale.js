import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {COLOR} from "../../common/colors/color";
import MyText from "../Text";
import db from "../../common/db/firestore";


const Risale = ({name, icon, redirect}) => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate(redirect)}>
            <View style={styles.roundedBox}>
                <MyText style={styles.icon}>{icon}</MyText>
                <MyText style={styles.text}>{name}</MyText>
            </View>
        </Pressable>
    )
}

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
        shadowOffset: {width: -2, height: 10},
        shadowOpacity: 0.1,
        elevation: 5,
    },
    roundedBox: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 20
    },
    text: {
        color: 'black',
        fontSize: 13,
        fontWeight: '400',
        paddingLeft: 15,
        flex: 3
    },
    icon: {
        flex: 1,
        paddingVertical: 7,
        paddingRight: 7,
        paddingLeft: 10,
        borderRadius: 13
    }
});

export default Risale;