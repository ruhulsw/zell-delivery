// import { RISALES } from '../datas/Risales';
import { Text, Platform, StyleSheet } from 'react-native';
import { COLOR } from '../../common/colors/color';
import BookIcon from '../../assets/icons/svg/book-icon';
import TwoColList from '../../common/components/TwoColList';
import TopBack from '../../common/components/TopBack';
import { useLocalSearchParams } from 'expo-router';
import SmoothFeedAnimation from '../../components/Animation/SmoothFeedAnimation';

const RisaleScreen = () => {
    const params = useLocalSearchParams();
    const subCategory = JSON.parse(params.subCategory);

    const RISALES = [];
    subCategory.map((item) => {
        RISALES.push({
            id: item._id,
            name: item.title,
            icon: <BookIcon style={{ width: 23, height: 23 }} />,
            redirect: 'RisaleCollection',
        });
    });
    return (
        <SmoothFeedAnimation>
            {Platform.OS === 'ios' && <Text style={styles.Risale}></Text>}
            <TopBack />
            <TwoColList data={RISALES} />
        </SmoothFeedAnimation>
    );
};

export default RisaleScreen;
const styles = StyleSheet.create({
    Risale: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: COLOR.primary,
        padding: 15,
    },
});
