import {Alert, Linking, Pressable, Share, StyleSheet, View} from "react-native";
import React from "react";
import {COLOR} from "../colors/color";
import {useNavigation} from "@react-navigation/native";
import MyText from "../../components/Text";


const SocialCol = ({name, shareIcon, icon, redirect, index, item}) => {
    const navigation = useNavigation();
    const onShare = async () => {
        if (shareIcon){
            try {
                await Share.share({
                    message: 'React Native | A framework for building native apps using React',
                });
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    };

    return (
        <Pressable style={styles.container} onPress={() => Linking.openURL(redirect)}>
            <View style={styles.roundedBox}>
                <MyText style={styles.icon}>{icon}</MyText>
                <MyText style={styles.text}>{name}</MyText>
            </View>
        </Pressable>
    )
}

export default SocialCol;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: COLOR.shadow,
        shadowOffset: {width: -2, height: 3},
        shadowOpacity: 0.1,
        elevation: 8,
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
        flex: 3,
        // paddingHorizontal: 20
    },
    icon: {
        flex: 1
    }
});