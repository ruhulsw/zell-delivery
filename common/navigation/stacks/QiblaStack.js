import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native";
import QiblaScreen from "../../../Screens/QiblaScreen";

const Stack = createStackNavigator();

const QiblaStack = () => {

    StatusBar.setBarStyle('dark-content'); // Change text color
    return (
        <Stack.Navigator>
            <Stack.Screen name="Qibla" component={QiblaScreen} />
        </Stack.Navigator>
    )
}

export default QiblaStack;