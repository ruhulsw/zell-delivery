import TwoCol from './TwoCol';
import { FlatList, StyleSheet, View } from 'react-native';
import { COLOR } from '../colors/color';

const TwoColList = ({ data }) => {
    const renderItem = ({ item }) => (
        <TwoCol
            id={item.id}
            name={item.name}
            icon={item.icon}
            redirect={item.redirect}
        />
    );
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                />
            </View>
        </View>
    );
};

export default TwoColList;

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 30,
        height: '60%',
        width: '100%',
        alignItems: 'space-around',
        backgroundColor: COLOR.background,
    },
    container: {
        flex: 1, // Each half-screen takes an equal amount of space
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
});
