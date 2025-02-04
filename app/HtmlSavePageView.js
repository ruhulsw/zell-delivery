import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import GetBook from '../FetchData/GetBook';
import GesturePage from '../HtmlViewer/GesturePage';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HtmlSavePageView = () => {
    const [loading, setLoading] = useState(true);
    const [Book, setBook] = useState(null);
    const params = useLocalSearchParams();
    const BookInfo = JSON.parse(params.Book);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const storageKey = `book_${BookInfo.id}`;
                const data = await GetBook({ BookId: BookInfo.id });
                const localData = JSON.parse(
                    await AsyncStorage.getItem(storageKey)
                );
                if (JSON.stringify(data) !== JSON.stringify(localData)) {
                    await AsyncStorage.setItem(
                        storageKey,
                        JSON.stringify(data)
                    );
                    setBook(data);
                } else if (localData) {
                    setBook(localData);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [BookInfo.id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return <GesturePage SavePage={true} BookInfo={BookInfo} Book={Book} />;
};

export default HtmlSavePageView;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
