import { StyleSheet, View } from "react-native";
import React from "react";
import MyText from "../Text";

const NamazItem = ({ name, time, icon }) => {
  return (
    <View style={styles.container}>
      <MyText style={[styles.text, styles.icon]}>{icon}</MyText>
      <MyText style={styles.text}>{name}</MyText>
      <MyText style={[styles.text, styles.time]}>{time}</MyText>
    </View>
  );
};

export default NamazItem;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(231,221,221,0.53)",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: "9%",
  },
  text: {
    flex: 4,
    color: "rgb(159,159,159)",
    fontWeight: "500",
    marginRight: 10,
    fontSize: 17,
    paddingTop: 5,
    paddingBottom: 15,
    marginTop: 10,
  },
  time: {
    flex: 3,
  },
  icon: {
    width: 10,
    flex: 1,
    paddingLeft: 10,
    marginTop: 5,
    paddingBottom: 10,
  },
});
