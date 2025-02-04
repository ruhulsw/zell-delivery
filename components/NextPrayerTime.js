import { FlatList, StyleSheet, View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import HomeNamaz from './HomeNamaz';
import axios from 'axios';
import moment from 'moment-hijri';
moment.locale('en');
import { useNavigation } from '@react-navigation/native';
import { SunriseIcon } from '../assets/icons/svg/sunrise-icon';
import { COLOR } from '../common/colors/color';
import { MorningIcon } from '../assets/icons/svg/morning-icon';
import { MiddayIcon } from '../assets/icons/svg/midday-icon';
import { AfternoonIcon } from '../assets/icons/svg/afternoon-icon';
import { SunsetIcon } from '../assets/icons/svg/sunset-icon';
import { MoonBrightIcon } from '../assets/icons/svg/moon-bright-icon';
import MyText from './Text';
import LocationContext from '../common/context/LocationContext';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const NextPrayerTime = () => {
    const navigation = useNavigation();
    const { city, country } = useContext(LocationContext);
    const [todayNamaz, setTodayNamaz] = useState({});
    const [nextTime, setNextTime] = useState('');
    const [nextNamaz, setNextNamaz] = useState('');
    const [timeUntil, setTimeUntil] = useState('');
    const keyOrder = ['fajr', 'shurooq', 'dhuhr', 'asr', 'maghrib', 'isha'];

    const icons = {
        fajr: <SunriseIcon width={20} height={20} fill={COLOR.light} />,
        shurooq: <MorningIcon width={20} height={20} fill={COLOR.light} />,
        dhuhr: <MiddayIcon width={20} height={20} fill={COLOR.light} />,
        asr: <AfternoonIcon width={20} height={20} fill={COLOR.light} />,
        maghrib: <SunsetIcon width={20} height={20} fill={COLOR.light} />,
        isha: <MoonBrightIcon width={16} height={16} fill={COLOR.light} />,
    };

    const getTodayNamaz = (city) => {
        const apiUrl = `https://muslimsalat.com/monthly/${city}/5/false.json`;
        axios
            .get(apiUrl)
            .then((response) => {
                setTodayNamaz(response.data.items[0]);
                getNextNamaz(response.data.items[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const getNextNamaz = (data) => {
        let date = data['date_for'];
        let namaz = new Date();
        let currentDate = new Date();

        for (const key of keyOrder) {
            const currentDate = new Date();
            if (!data[key]) {
                return 'fajr';
            }
            let hm = data[key].split(':');
            if (hm[1].includes('pm')) hm[0] = parseInt(hm[0]) + 12;
            hm[1] = hm[1].slice(0, hm[1].length - 3);
            const namazString = date + ' ' + hm[0] + ':' + hm[1];
            const namaz = new Date(namazString);
            if (
                namaz.getHours() > currentDate.getHours() ||
                (namaz.getHours() === currentDate.getHours() &&
                    namaz.getMinutes() > currentDate.getMinutes())
            ) {
                setNextNamaz(key);
                setNextTime(data[key]);
                const timeDifferenceMs = namaz - currentDate;
                let hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
                let minutes = Math.floor(
                    (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
                );
                if (parseFloat(hours) < 0) {
                    minutes = 0;
                    hours = 0;
                }

                setTimeUntil(hours + ':' + minutes);
                return key;
            }
        }
        const key = 'fajr';
        setNextNamaz(key);
        setNextTime(data[key]);
        const timeDifferenceMs = namaz - currentDate;
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutes = Math.floor(
            (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        setTimeUntil(hours + ':' + minutes);
        return key;
    };

    const init = async (city) => {
        getTodayNamaz(city);
    };

    useEffect(() => {
        init(city);
    }, [city]);

    const renderItem = ({ item }) => (
        <HomeNamaz
            name={item}
            icon={icons[item]}
            time={todayNamaz[item]}
            isNext={item === nextNamaz}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.cityWeather}>
                <View style={styles.City}>
                    <EvilIcons
                        name="location"
                        size={18}
                        color="black"
                        style={{ padding: 1 }}
                    />
                    <Text>{country}</Text>
                    <EvilIcons
                        name="arrow-right"
                        size={18}
                        color="black"
                        style={{ padding: 1 }}
                    />
                    <Text>{city}</Text>
                </View>
                <View style={styles.Weather}>
                    <Text>22</Text>
                    <MaterialCommunityIcons
                        name="temperature-celsius"
                        size={18}
                        color="black"
                    />
                </View>
            </View>

            <View style={styles.TimeContainer}>
                <MyText style={styles.nextNamaz}>
                    {nextNamaz.charAt(0).toUpperCase() + nextNamaz.slice(1)}
                </MyText>
                <MyText style={styles.nextTime}>{nextTime}</MyText>
                <View style={styles.dates}>
                    <Text
                        style={styles.text}
                        onPress={() => navigation.navigate('Calendar')}
                    >
                        {moment().format('DD MMMM YYYY')}
                    </Text>
                    <Text style={styles.text}>
                        {moment().format('iD iMMMM iYYYY')}
                    </Text>
                </View>
                <FlatList
                    data={keyOrder}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default NextPrayerTime;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    cityWeather: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    City: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Weather: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    TimeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dates: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    nextNamaz: {
        fontSize: 28,
        color: '#fefefe',
        marginTop: 5,
        fontFamily: 'SawarabiMincho',
    },
    nextTime: {
        fontSize: 63,
        color: '#f9fbfc',
        fontFamily: 'SawarabiMincho',
    },
    text: {
        color: '#fefefe',
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'SawarabiMincho',
    },
});
