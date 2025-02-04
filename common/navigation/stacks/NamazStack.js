import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native";
import NamazScreen from "../../../Screens/NamazScreen";

const Stack = createStackNavigator();

const NamazStack = () => {

    StatusBar.setBarStyle('dark-content'); // Change text color
    return (
        <Stack.Navigator>
            <Stack.Screen name="Namaz" component={NamazScreen} />
        </Stack.Navigator>
    )
}

export default NamazStack;