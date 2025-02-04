import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Platform, Share } from 'react-native';
import TermatikaModal from '../../modal/TermatikaModal';
import { COLOR } from '../colors/color';
import MyText from '../../components/Text';
import { router } from 'expo-router';

const OneCol = ({ name, shareIcon, icon, redirect, index, url, item }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onShare = async () => {
        if (shareIcon) {
            try {
                await Share.share({
                    message: url,
                });
            } catch (error) {
                Alert.alert(error.message);
            }
        }
    };

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <>
            <Pressable
                style={styles.container}
                onPress={() =>
                    router.push({
                        pathname: '/HtmlViewer',
                        params: { Book: JSON.stringify(item) },
                    })
                }
            >
                <View style={styles.roundedBox}>
                    <MyText style={styles.icon}>{icon}</MyText>
                    <MyText style={styles.text}>
                        {index}. {name}
                    </MyText>
                    <Pressable style={styles.Termatika} onPress={openModal}>
                        <MyText>Termatika</MyText>
                    </Pressable>
                    <Pressable style={styles.shareIcon} onPress={onShare}>
                        <MyText>{shareIcon}</MyText>
                    </Pressable>
                </View>
            </Pressable>

            <TermatikaModal
                visible={modalVisible}
                onClose={closeModal}
                title="Birinci Söz"
                description="Besmelenin anlam ve önemi. Çeşitli varlıkların dilinde besmele. Allah’ın adını anmak ve Onun adıyla hareket etmek neler kazandırır?"
            />
        </>
    );
};

export default OneCol;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '90%',
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: COLOR.shadow,
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.1,
        elevation: 8,
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
        fontWeight: '500',
        fontSize: 14,
        flex: 4,
    },
    shareIcon: {
        flex: 2,
        height: Platform.OS === 'ios' ? 15 : 20,
        alignItems: 'center',
    },
    Termatika: {
        borderWidth: 1,
        borderColor: '#151414cf',
        borderRadius: 5,
        paddingHorizontal: 3,
        paddingBottom: 2,
    },
    icon: {
        flex: 1,
        height: Platform.OS === 'ios' ? 15 : 20,
    },
});
