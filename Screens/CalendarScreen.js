import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import axios from "axios";

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [islamicEvents, setIslamicEvents] = useState({});

    const getCalendar1Year = async () => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth(); // Returns a zero-based index (0-11)
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentMonthIndex; // Adjust the index to get a number from 1 to 12

        for (let index = 1; index<13; index++) {
            if (currentMonth + index > 12) {
                await getCalendarEvents(currentMonth + index - 12, currentYear+1);
            } else {
                await getCalendarEvents(currentMonth + index, currentYear);
            }
        }
    }

    const getCalendarEvents = async (month, year) => {
        const result = islamicEvents
        const apiUrl = `http://api.aladhan.com/v1/gToHCalendar/${month}/${year}`;
        await axios.get(apiUrl)
            .then(response => {
                const data = response.data.data;
                data.forEach((item) => {
                    let holidays = item.hijri.holidays;
                    let key = `${item.gregorian.year}-${String(item.gregorian.month.number).padStart(2, '0')}-${item.gregorian.day}`;
                    if (holidays.length > 0)
                        result[key] = []

                    for (let val of holidays) {
                        result[key].push(val);
                    }
                })
                setIslamicEvents({...result});
                setSelectedDate('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getCalendar1Year()

    }, [])

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const renderAgendaItem = (item) => {
        return (
            <View style={{padding: 50}}>
                <Text>{item}</Text>
            </View>
        );
    };
    const renderEmptyDate = () => {
        return (
            <View style={{ height: 15, flex: 1, backgroundColor: '#f0f0f0', opacity: 0.3 }} />
        );
    };

    return (
        <View style={{flex: 1}}>
            <Agenda
                items={islamicEvents}
                onDayPress={handleDayPress}
                pastScrollRange={1}
                futureScrollRange={12}
                selected={selectedDate}
                rowHasChanged={(r1, r2) => r1.text !== r2.text}
                renderItem={renderAgendaItem}
                renderEmptyData={renderEmptyDate}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
});

export default CalendarScreen;
