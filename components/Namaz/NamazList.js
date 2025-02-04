import { FlatList, StyleSheet } from "react-native";
import { COLOR } from "../../common/colors/color";
import React, { useContext, useEffect, useState } from "react";
import NamazItem from "./NamazItem";
import { SunriseIcon } from "../../assets/icons/svg/sunrise-icon";
import { MorningIcon } from "../../assets/icons/svg/morning-icon";
import { MiddayIcon } from "../../assets/icons/svg/midday-icon";
import { AfternoonIcon } from "../../assets/icons/svg/afternoon-icon";
import { SunsetIcon } from "../../assets/icons/svg/sunset-icon";
import { MoonBrightIcon } from "../../assets/icons/svg/moon-bright-icon";
import axios from "axios";
import * as Location from "expo-location";
import LocationContext from "../../common/context/LocationContext";

const NamazList = ({ index }) => {
  const { city, errorMsg } = useContext(LocationContext);
  const [weekNamaz, setWeekNamaz] = useState([{}]);
  const keyOrder = ["fajr", "shurooq", "dhuhr", "asr", "maghrib", "isha"]; // Specify the desired key order
  const icons = {
    fajr: <SunriseIcon width={35} height={35} fill={COLOR.secondary} />,
    shurooq: <MorningIcon width={35} height={35} fill={COLOR.secondary} />,
    dhuhr: <MiddayIcon width={35} height={35} fill={COLOR.secondary} />,
    asr: <AfternoonIcon width={35} height={35} fill={COLOR.secondary} />,
    maghrib: <SunsetIcon width={35} height={35} fill={COLOR.secondary} />,
    isha: <MoonBrightIcon width={28} height={28} fill={COLOR.secondary} />,
  };
  const getWeekNamaz = async () => {
    const dailyApiUrl = `https://muslimsalat.com/weekly/${city}/5/false.json`;
    await axios
      .get(dailyApiUrl)
      .then(async (response) => {
        await setWeekNamaz(response.data.items);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getCurrentCity = async () => {
    let cit = "Tirana";
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      let { latitude, longitude } = location.coords;
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        cit = address[0].city;
        if (cit === "Tiranë") cit = "Tirana";
      }
    } catch (error) {
      error.log(error);
    }
    return cit;
  };

  const init = async () => {
    await getWeekNamaz("Tirana");
    const cit = await getCurrentCity();
    await getWeekNamaz(cit);
  };
  useEffect(() => {
    init();
  }, [city]);

  const renderItem = ({ item }) => (
    <NamazItem name={item} icon={icons[item]} time={weekNamaz[index][item]} />
  );

  return (
    <FlatList
      data={keyOrder}
      renderItem={renderItem}
      keyExtractor={(item, indx) => indx.toString()}
      numColumns={1}
      style={styles.container}
    />
  );
};

export default NamazList;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
