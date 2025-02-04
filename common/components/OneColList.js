import OneCol from './OneCol';
import { RightArrowIcon } from '../../assets/icons/svg/right-arrow-icon';
import { ShareIcon } from '../../assets/icons/svg/share-icon';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { COLOR } from '../colors/color';

const OneColList = ({ data }) => {
    if (data.message === 'Request failed with status code 404') {
        Alert.alert('No books found', 'No books found for this SubCategory ID');
        return;
    }
    const renderItem = (item, index) => {
        return (
            <OneCol
                index={index}
                name={item.title}
                shareIcon={<ShareIcon style={{ width: 23, height: 23 }} />}
                icon={<RightArrowIcon style={{ width: 20, height: 20 }} />}
                redirect={item.id}
                url={item.id}
                item={item}
            />
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return renderItem(item, index + 1);
                    }}
                    keyExtractor={(item) => item.title}
                    numColumns={1}
                />
            </View>
        </View>
    );
};

export default OneColList;

const styles = StyleSheet.create({
    list: {
        backgroundColor: COLOR.background,
    },
    container: {
        paddingVertical: 10,
    },
});
