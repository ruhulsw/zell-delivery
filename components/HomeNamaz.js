import { View, StyleSheet } from "react-native";
import React from "react";
import MyText from "./Text";

const HomeNamaz = ({ name, icon, time, isNext }) => {
  const updatedIcon = React.cloneElement(icon, {
    fill: isNext ? "#E9A962" : icon.props.fill,
  });

  return (
    <View style={[styles.container, isNext && styles.highlight]}>
      {updatedIcon}

      <MyText style={[styles.text, isNext && styles.highlightText]}>
        {name}
      </MyText>
      <MyText style={[styles.text, isNext && styles.highlightText]}>
        {time}
      </MyText>
    </View>
  );
};

export default HomeNamaz;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    marginHorizontal: 3,
    paddingHorizontal: 3,
    height: 60,
  },
  highlight: {
    borderColor: "#E9A962",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontFamily: "SawarabiMincho",
  },
  highlightText: {
    color: "#E9A962",
    fontSize: 13,
  },
});
