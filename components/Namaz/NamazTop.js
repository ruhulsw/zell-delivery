import { Dimensions, Image, StyleSheet, View } from "react-native";
import { COLOR } from "../../common/colors/color";
import React, { useContext, useEffect, useState } from "react";
import { SunriseIcon } from "../../assets/icons/svg/sunrise-icon";
import { MorningIcon } from "../../assets/icons/svg/morning-icon";
import { MiddayIcon } from "../../assets/icons/svg/midday-icon";
import { AfternoonIcon } from "../../assets/icons/svg/afternoon-icon";
import { SunsetIcon } from "../../assets/icons/svg/sunset-icon";
import { MoonBrightIcon } from "../../assets/icons/svg/moon-bright-icon";
import axios from "axios";
import MyText from "../Text";
import LocationContext from "../../common/context/LocationContext";
// import CountryCityModal from "../../modal/CountryCityModal";

const NamazTop = () => {
  const { city, country, errorMsg } = useContext(LocationContext);
  const [todayNamaz, setTodayNamaz] = useState({});
  const [nextTime, setNextTime] = useState("");
  const [nextNamaz, setNextNamaz] = useState("");
  const [timeUntil, setTimeUntil] = useState("");

  const keyOrder = ["fajr", "shurooq", "dhuhr", "asr", "maghrib", "isha"]; // Specify the desired key order

  const icons = {
    fajr: <SunriseIcon width={20} height={20} fill={COLOR.light} />,
    shurooq: <MorningIcon width={20} height={20} fill={COLOR.light} />,
    dhuhr: <MiddayIcon width={20} height={20} fill={COLOR.light} />,
    asr: <AfternoonIcon width={20} height={20} fill={COLOR.light} />,
    maghrib: <SunsetIcon width={20} height={20} fill={COLOR.light} />,
    isha: <MoonBrightIcon width={18} height={18} fill={COLOR.light} />,
  };

  const getTodayNamaz = async () => {
    const apiUrl = `https://muslimsalat.com/monthly/${city}/5/false.json`;
    await axios
      .get(apiUrl)
      .then((response) => {
        setTodayNamaz(response.data.items[0]);
        getNextNamaz(response.data.items[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getNextNamaz = (data) => {
    let date = data["date_for"];
    let namaz = new Date();
    let currentDate = new Date();

    for (const key of keyOrder) {
      currentDate = new Date();
      if (!data[key]) {
        return "fajr";
      }
      let hm = data[key].split(":");
      if (hm[1].includes("pm")) hm[0] = parseInt(hm[0]) + 12;
      hm[1] = hm[1].slice(0, hm[1].length - 3);
      const namazString = date + " " + hm[0] + ":" + hm[1];
      let namaz = new Date(namazString);
      if (
        namaz.getHours() > currentDate.getHours() ||
        (namaz.getHours() === currentDate.getHours() &&
          namaz.getMinutes() > currentDate.getMinutes())
      ) {
        setNextNamaz(key);
        setNextTime(data[key]);
        const timeDifferenceMs = namaz - currentDate;
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        setTimeUntil(hours + ":" + minutes);
        return key;
      }
    }
    const key = "fajr";
    setNextNamaz(key);
    setNextTime(data[key]);
    const timeDifferenceMs = namaz - currentDate;
    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    setTimeUntil(hours + ":" + minutes);
    return key;
  };

  useEffect(() => {
    getTodayNamaz();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/icons/mosque.jpg")}
      />
      <MyText style={styles.header}>
        {nextNamaz.charAt(0).toUpperCase() + nextNamaz.slice(1)}
      </MyText>
      <MyText style={styles.time}>{nextTime}</MyText>
      <MyText style={styles.location}>
        {city}, {country}
      </MyText>
    </View>
  );
};

export default NamazTop;

const styles = StyleSheet.create({
  pointer: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    paddingTop: 50,
    height: 250,
  },
  header: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  time: {
    fontSize: 27,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  location: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
