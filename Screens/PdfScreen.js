import {Alert, Dimensions, Share, StyleSheet, View} from "react-native";
import React, {useEffect} from "react";
import {COLOR} from "../common/colors/color";
import Pdf from "react-native-pdf";


const PdfScreen = ({route}) => {
    const onShare = async (message) => {
        try {
            const result= await Share.share({
                message: message,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    const source = { uri: route.params.content.url, cache: true };
    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                source={source}
                enablePaging={true}
                onLoadComplete={(numberOfPages,filePath) => {
                }}
                onPageChanged={(page,numberOfPages) => {
                }}
                horizontal={true}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        </View>
    )
}

export default PdfScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headerContainer: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 36,
        right: 16,
        backgroundColor: COLOR.primary,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // for shadow on Android
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
// });