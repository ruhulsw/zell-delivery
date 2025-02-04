import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import GetAllCategory from '../../FetchData/GetCategory';
import { CATEGORIES } from '../../datas/Categories';
import Category from '../../components/Category';
import { COLOR } from '../../common/colors/color';
import NextPrayerTime from '../../components/NextPrayerTime';
import { LocationProvider } from '../../common/context/LocationContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';

function HomeScreen() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await GetAllCategory();
                const localData = JSON.parse(
                    await AsyncStorage.getItem('categories')
                );
                if (JSON.stringify(data) !== JSON.stringify(localData)) {
                    await AsyncStorage.setItem(
                        'categories',
                        JSON.stringify(data)
                    );
                    setCategories(data);
                } else if (localData) {
                    setCategories(localData);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const renderItem = ({ item }) => {
        const category = categories.find((cat) => cat._id === item.id);
        return (
            <Category
                name={item.name}
                icon={item.icon}
                redirect={item.redirect}
                item={item}
                subCategory={category ? category.subCategory : []}
            />
        );
    };

    return (
        <SmoothFeedAnimation>
            <LocationProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.namazTime}>
                        <NextPrayerTime />
                    </View>
                    <View style={styles.categories}>
                        {!loading && (
                            <FlatList
                                data={CATEGORIES}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                                style={styles.content}
                            />
                        )}
                    </View>
                </SafeAreaView>
            </LocationProvider>
        </SmoothFeedAnimation>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    namazTime: {
        height: '40%',
        width: '100%',
    },
    categories: {
        flex: 1,
        height: '60%',
        width: '100%',
        alignItems: 'space-around',
        backgroundColor: COLOR.background,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingLeft: 9,
    },
    content: {
        paddingVertical: 18,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.primary,
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
