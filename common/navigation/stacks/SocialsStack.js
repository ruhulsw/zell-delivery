import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native";
import SocialsScreen from "../../../Screens/SocialsScreen";

const Stack = createStackNavigator();

const SocialStack = () => {
    StatusBar.setBarStyle('dark-content');

    return (
        <Stack.Navigator>
            <Stack.Screen name="Social" component={SocialsScreen}  options={{title: 'Rrjetet sociale'}} />
        </Stack.Navigator>
    )
}

export default SocialStack;