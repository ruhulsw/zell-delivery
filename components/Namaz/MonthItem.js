import {Pressable, StyleSheet, View} from "react-native";
import {COLOR} from "../../common/colors/color";
import React, {useEffect, useState} from "react";
import MyText from "../Text";

const MonthItem = ({sentData}) => {

    const [week, setWeek] = useState(['', '', '', '', '', '', '']);
    const [day, setDay] = useState([])
    const [currentDay, setCurrentDay] = useState(0)


    function getNext5Days() {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        const today = new Date();
        const days = []
        const next7Days = []
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            days.push(daysOfWeek[currentDate.getDay()])
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-based
            const day = currentDate.getDate().toString().padStart(2, '0');
            next7Days.push(`${month}/${day}`)
        }
        setDay(days)
        setWeek(next7Days)
    }

    const clickHandler = (index) => {
        sentData(index);
        setCurrentDay(index);
    }

    useEffect(() => {
        getNext5Days()
    }, []);

    const dynamicStyles = (index) => {

        return {
            borderBot: {
                borderBottomColor: currentDay === index ? COLOR.light : 'transparent',
            },
        }
    };

    return (
        <View style={styles.container}>
            {week.map((item, index) => (
                <Pressable key={index} onPress={() => clickHandler(index)}
                      style={[styles.textView, dynamicStyles(index).borderBot]}><MyText style={styles.text}>{item}</MyText>
                    <MyText style={styles.day}>{day[index]}</MyText></Pressable>
            ))}
        </View>
    )
}
export default MonthItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderRadius: 30,
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: COLOR.secondary
    },
    text: {
        color: COLOR.light,
        fontWeight: '700',
        fontSize: 14,
        textAlign: "center",
    },
    textView: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 6,
        borderBottomColor: COLOR.light,
        borderBottomWidth: 4,
    },
    day: {
        fontSize: 13,
        color: COLOR.light,
        textAlign: "center",
        marginBottom: 6,
    }
})

