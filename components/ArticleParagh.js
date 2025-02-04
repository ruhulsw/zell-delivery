import {Image, ScrollView, StyleSheet} from "react-native";
import React from "react";
import MyText from "./Text";


const ArticleParagh = ({title, content}) => {
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{uri: 'https://example.com/your-image.jpg'}}
                style={styles.articleImage}
            />
            <MyText style={styles.articleTitle}>{title}</MyText>
            <MyText style={styles.articleContent}>{content}</MyText>
        </ScrollView>
    )
}

export default ArticleParagh;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    articleImage: {
        width: '100%',
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    articleContent: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
    },
});