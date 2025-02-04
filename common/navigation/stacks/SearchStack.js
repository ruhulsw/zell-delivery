import {createStackNavigator} from "@react-navigation/stack";
import SearchScreen from "../../../Screens/SearchScreen";
import React from "react";
import {StatusBar} from "react-native";

const Stack = createStackNavigator();

const SearchStack = () => {
    StatusBar.setBarStyle('dark-content'); // Change text color

    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen}  options={{title: 'Exploro Kategorite'}} />
        </Stack.Navigator>
    )
}

export default SearchStack;