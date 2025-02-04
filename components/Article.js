import {FlatList, Image, StyleSheet} from "react-native";
import React, {useEffect} from "react";
import ArticleParagh from "./ArticleParagh";
import MyText from "./Text";
import { ScrollView } from 'react-native-virtualized-view'


const Article = ({article}) => {
    const renderItem = ({item}) => (
        <ArticleParagh title={item.title} content={item.content}/>
    );
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{uri: 'https://example.com/your-image.jpg'}}
                style={styles.articleImage}
            />
            <MyText style={styles.articleTitle}>{article.name}</MyText>
            <FlatList
                data={article.content}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={1}
            />
        </ScrollView>
    );
}

export default Article;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    articleImage: {
        width: '100%',
        // height: 200,
    },
    articleTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 16,
    },
    articleContent: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
    },
});
