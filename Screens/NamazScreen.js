import { View } from "react-native";
import React, { useState } from "react";
import NamazTop from "../components/Namaz/NamazTop";
import MonthItem from "../components/Namaz/MonthItem";
import NamazList from "../components/Namaz/NamazList";
import { LocationProvider } from "../common/context/LocationContext";

const NamazScreen = () => {
  const [index, setIndex] = useState(0);

  const sentData = (data) => {
    setIndex(data);
  };
  return (
    <LocationProvider>
      <View>
        <View>
          <NamazTop />
        </View>
        <View>
          <MonthItem sentData={sentData} />
        </View>
        <View>
          <NamazList index={index} />
        </View>
      </View>
    </LocationProvider>
  );
};

export default NamazScreen;
