// import {Dimensions, View} from "react-native";
// import PDFView from 'react-native-pdf';
// import Pdf from 'react-native-pdf';
import React from 'react';
import {StyleSheet, View} from "react-native";
import MyText from "./Text";
import Pdf from "react-native-pdf";
// import {Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
// <Pdf source={} />


// Create Document Component
// const MyDocument = () => (
    // <Document>
    //     <Page size="A4" style={styles.page}>
    //         <View style={styles.section}>
    //             <Text>Section #1</Text>
    //         </View>
    //         <View style={styles.section}>
    //             <Text>Section #2</Text>
    //         </View>
    //     </Page>
    // </Document>
// );

const Surah = () => {
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

    return (
        <View style={styles.container}>
            <MyText>asaaaaaaaaaaaad</MyText>
            {/*<PDFViewer>*/}
            {/*    <MyDocument />*/}
            {/*</PDFViewer>*/}
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
                }}
                onPageChanged={(page,numberOfPages) => {
                }}
                onError={(error) => {
                }}
                onPressLink={(uri) => {
                }}
                style={styles.pdf}/>
        </View>
    )
}

export default Surah;
// Create styles
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
});
