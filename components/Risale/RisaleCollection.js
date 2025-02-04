import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {COLOR} from "../../common/colors/color";
import MyText from "../Text";


const RisaleCollection = ({name, arabicName, icon, redirect, index}) => {

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate(redirect)}>
            <View style={styles.roundedBox}>
                <MyText style={styles.icon}>{icon}</MyText>
                <MyText style={styles.text}>{index}.  {name}</MyText>
                <MyText style={styles.risaleText}>{arabicName}</MyText>
            </View>
        </Pressable>
    )
}

export default RisaleCollection;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '90%',
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: '5%',
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
        fontWeight: '500',
        fontSize: 14,
        flex: 4
    },
    risaleText: {
        color: COLOR.secondary,
        fontSize: 16,
        flex: 2,
    },
    icon: {
        flex: 1
    }
});