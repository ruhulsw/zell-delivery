import React, { useState, useEffect } from 'react';
import { Alert, Text, Platform, StyleSheet } from 'react-native';
import { COLOR } from '../../common/colors/color';
import OneColList from '../../common/components/OneColList';
import GetBooks from '../../FetchData/GetBooks';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBack from '../../common/components/TopBack';
// import { RISALE_COLLECTIONS } from '../datas/RisaleCollections';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';

const RisaleCollectionScreen = () => {
    const route = useRoute();
    const subCategoryId = route.params?.id;

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const storageKey = `books_${subCategoryId}`;
                const localData = JSON.parse(
                    await AsyncStorage.getItem(storageKey)
                );

                if (localData) {
                    setBooks(localData);
                }

                const apiData = await GetBooks({ subCategoryId });

                if (
                    apiData &&
                    JSON.stringify(apiData) !== JSON.stringify(localData)
                ) {
                    await AsyncStorage.setItem(
                        storageKey,
                        JSON.stringify(apiData)
                    );
                    setBooks(apiData);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                Alert.alert('Error fetching books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [subCategoryId]);

    if (loading) {
        return <Text></Text>;
    }
    return (
        <SmoothFeedAnimation>
            {Platform.OS === 'ios' && (
                <Text style={styles.RisaleCollection}></Text>
            )}
            <TopBack />
            <OneColList data={books} />
        </SmoothFeedAnimation>
    );
};

export default RisaleCollectionScreen;
const styles = StyleSheet.create({
    RisaleCollection: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: COLOR.primary,
        padding: 15,
    },
});
