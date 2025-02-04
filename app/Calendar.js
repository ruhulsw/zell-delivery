import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    Button,
    LogBox,
} from 'react-native';
import {
    ExpandableCalendar,
    AgendaList,
    CalendarProvider,
} from 'react-native-calendars';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

LogBox.ignoreLogs([
    'ExpandableCalendar: Support for defaultProps will be removed from function components',
]);

const limitText = (text, limit) =>
    text.length > limit ? text.substring(0, limit) + '...' : text;

const themeColor = '#00AAAF';
const leftArrowIcon = require('../assets/images/previous.png');
const rightArrowIcon = require('../assets/images/next.png');

const CalendarScreen = () => {
    const [agendaItems, setAgendaItems] = useState([]);
    const [islamicEvents, setIslamicEvents] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split('T')[0]
    );

    const getCalendar1Year = useCallback(async () => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        for (let index = 1; index <= 12; index++) {
            const month = ((currentMonthIndex + index) % 12) + 1;
            const year =
                currentMonthIndex + index > 11 ? currentYear + 1 : currentYear;
            await getCalendarEvents(month, year);
        }
    }, [getCalendarEvents]);

    const getCalendarEvents = useCallback(
        async (month, year) => {
            const result = islamicEvents;
            const apiUrl = `http://api.aladhan.com/v1/gToHCalendar/${month}/${year}`;
            try {
                const response = await axios.get(apiUrl);
                const data = response.data.data;

                const formattedItems = data
                    .map((item) => {
                        const date = `${item.gregorian.year}-${String(
                            item.gregorian.month.number
                        ).padStart(2, '0')}-${item.gregorian.day}`;
                        const holidays = item.hijri.holidays;

                        if (holidays.length > 0) {
                            if (!result[date]) result[date] = [];
                            result[date] = [...result[date], ...holidays];
                            return {
                                title: date,
                                data: holidays.map((holiday) => ({
                                    title: holiday,
                                    hijriDate: item.hijri.date,
                                    gregorianDate: item.gregorian.date,
                                    month: item.hijri.month.en,
                                    year: item.hijri.year,
                                })),
                            };
                        }

                        return null;
                    })
                    .filter((item) => item !== null);

                setAgendaItems((prevItems) => [
                    ...prevItems,
                    ...formattedItems,
                ]);
                setIslamicEvents({ ...result });
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        },
        [islamicEvents]
    );

    useEffect(() => {
        getCalendar1Year();
    }, [getCalendar1Year]);

    const handleInfoPress = useCallback((item) => {
        setSelectedEvent(item);
        setModalVisible(true);
    }, []);

    const renderItem = useCallback(
        ({ item }) => {
            if (isEmpty(item)) {
                return (
                    <View style={styles.emptyItem}>
                        <Text style={styles.emptyItemText}>
                            No Events Planned Today
                        </Text>
                    </View>
                );
            }

            return (
                <View style={styles.item}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemHourText}>
                            {item.hijriDate}
                        </Text>
                        <Text style={styles.itemDurationText}>
                            {item.gregorianDate}
                        </Text>
                        <Text style={styles.itemTitleText}>
                            {limitText(item.title, 30)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.infoButton}
                        onPress={() => handleInfoPress(item)}
                    >
                        <MaterialIcons name="info" size={16} color="white" />
                        <Text style={styles.infoButtonText}>Info</Text>
                    </TouchableOpacity>
                </View>
            );
        },
        [handleInfoPress]
    );

    const renderSectionHeader = useCallback(
        (section) => (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                    {new Date(section).toDateString().toUpperCase()}
                </Text>
            </View>
        ),
        []
    );

    const markedDates = useMemo(() => {
        return Object.keys(islamicEvents).reduce((acc, date) => {
            acc[date] = { marked: true };
            return acc;
        }, {});
    }, [islamicEvents]);

    return (
        <CalendarProvider
            date={selectedDate}
            showTodayButton
            onDateChanged={(date) => setSelectedDate(date)}
            theme={{
                todayButtonTextColor: themeColor,
            }}
        >
            <ExpandableCalendar
                initialPosition={ExpandableCalendar.positions.OPEN}
                disablePan={true}
                firstDay={1}
                markedDates={markedDates}
                calendarStyle={styles.calendar}
                animateScroll={true}
                leftArrowImageSource={leftArrowIcon}
                rightArrowImageSource={rightArrowIcon}
            />
            <AgendaList
                useMoment={true}
                avoidDateUpdates={true}
                sections={agendaItems}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                sectionStyle={styles.section}
                getItemLayout={(data, index) => ({
                    length: 50, // Fixed item height
                    offset: 50 * index,
                    index,
                })}
                onScrollToIndexFailed={(info) => {
                    setTimeout(() => {
                        flatListRef.current?.scrollToIndex({
                            index: info.index,
                            animated: true,
                        });
                    }, 500);
                }}
                initialNumToRender={20}
            />

            {/* Modal for event details */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {selectedEvent?.title || 'Event Details'}
                        </Text>
                        <Text style={styles.modalText}>
                            Hijri Date: {selectedEvent?.hijriDate || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                            Gregorian Date:{' '}
                            {selectedEvent?.gregorianDate || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                            Hijri Month: {selectedEvent?.month || 'N/A'}
                        </Text>
                        <Text style={styles.modalText}>
                            Hijri Year: {selectedEvent?.year || 'N/A'}
                        </Text>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(false)}
                            color={themeColor}
                        />
                    </View>
                </View>
            </Modal>
        </CalendarProvider>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
    },
    sectionHeader: {
        backgroundColor: '#f4f4f7',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#555',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffffe5',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    itemHourText: {
        color: 'black',
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    itemTitleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    emptyItemText: {
        color: 'lightgrey',
        fontSize: 14,
    },
    calendar: {
        paddingLeft: 20,
        paddingRight: 20,
        color: 'red',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColor,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 10,
    },
    infoButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default CalendarScreen;
