import {FlatList, StyleSheet, View} from "react-native";
import {COLOR} from "../colors/color";
import React from "react";
import SocialCol from "./SocialsCol";


const SocialsList = ({data}) => {
    const renderItem = (item, index) => {
        return <SocialCol index={index} name={item.name} shareIcon={item.shareIcon} icon={item.icon}
                       redirect={item.redirect} item={item}/>
    }
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                    data={data}
                    renderItem={({item, index}) => {
                        return renderItem(item, index + 1)
                    }}
                    keyExtractor={(item) => item.name}
                    numColumns={1}
                />
            </View>
        </View>
    )
}

export default SocialsList;

const styles = StyleSheet.create({
    list: {
        backgroundColor: COLOR.background,
    },
    container: {
        paddingVertical: 10
    },
});
