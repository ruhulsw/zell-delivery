import HomeStack from "../stacks/HomeStack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchStack from "../stacks/SearchStack";
import BookIcon from "../../../assets/icons/svg/book-icon";
import {SearchIcon} from "../../../assets/icons/svg/search-icon";
import {COLOR} from "../../colors/color";
import BookTabIcon from "../../../assets/icons/svg/book-tab-icon";
import React from "react";
import MyText from "../../../components/Text";
import HandsIcon from "../../../assets/icons/svg/hands-icon";
import NamazStack from "../stacks/NamazStack";
import QiblaStack from "../stacks/QiblaStack";
import {QiblaIcon} from "../../../assets/icons/svg/qibla-icon";
import SocialsStack from "../stacks/SocialsStack";
import {SocialIcon} from "../../../assets/icons/svg/socials/social-icon";

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator initialRouteName="HomeStack" screenOptions={{
            headerShown: false, tabBarStyle: {
                borderWidth: 0
            }
        }}>
            <Tab.Screen
                options={{
                    unmountOnBlur: false,
                    tabBarLabel: ({focused}) => {
                        const labelStyle = {
                            fontSize: 10, // Adjust the font size based on whether the tab is selected
                            color: focused ? COLOR.primary : COLOR.grey, // Adjust the color as well
                        };
                        return <MyText style={labelStyle}>Socials</MyText>;
                    },
                    tabBarIcon: ({focused}) => {
                        const width = focused ? 25 : 20
                        const height = focused ? 25 : 20
                        return focused ? <SocialIcon style={{width: width, height: height, fill: COLOR.primary}}/> :
                            <SocialIcon style={{width: width, height: height, fill: COLOR.grey}}/>
                    },
                    labelStyle: {
                        color: COLOR.secondary,
                    },
                    tabBarItemStyle: {
                        padding: 7,
                    }
                }}
                name="SocialsStack" component={SocialsStack}/>
            <Tab.Screen
                options={{
                    unmountOnBlur: false,
                    tabBarLabel: ({focused}) => {
                        const labelStyle = {
                            fontSize: 10, // Adjust the font size based on whether the tab is selected
                            color: focused ? COLOR.primary : COLOR.grey, // Adjust the color as well
                        };
                        return <MyText style={labelStyle}>Qibla</MyText>;
                    },
                    tabBarIcon: ({focused}) => {
                        const width = focused ? 60 : 55
                        const height = focused ? 60 : 55
                        return focused ? <QiblaIcon style={{width: width, height: height, fill: COLOR.primary}}/> :
                            <QiblaIcon style={{width: width, height: height, fill: COLOR.grey}}/>
                    },
                    labelStyle: {
                        color: COLOR.secondary,
                    },
                    tabBarItemStyle: {
                        padding: 7,
                    }
                }}
                name="QiblaStack" component={QiblaStack}/>
            <Tab.Screen
                options={{
                    unmountOnBlur: false,
                    tabBarLabel: ({focused}) => {
                        const labelStyle = {
                            fontSize: 10, // Adjust the font size based on whether the tab is selected
                            color: focused ? COLOR.primary : COLOR.grey, // Adjust the color as well
                        };
                        return <MyText style={labelStyle}>Kryesore</MyText>;
                    },
                    tabBarIcon: ({focused}) => {
                        const width = focused ? 30 : 25
                        const height = focused ? 30 : 25
                        return focused ? <BookIcon style={{width: width, height: height}}/> :
                            <BookTabIcon style={{width: width, height: height}}/>
                    },
                    labelStyle: {
                        color: COLOR.secondary,
                    },
                    tabBarItemStyle: {
                        padding: 7,
                    }
                }}
                name="HomeStack" component={HomeStack}/>
            <Tab.Screen
                options={{
                    unmountOnBlur: false,
                    tabBarLabel: ({focused}) => {
                        const labelStyle = {
                            fontSize: 10, // Adjust the font size based on whether the tab is selected
                            color: focused ? COLOR.primary : COLOR.grey, // Adjust the color as well
                        };
                        return <MyText style={labelStyle}>Namaz</MyText>;
                    },
                    tabBarIcon: ({focused}) => {
                        const width = focused ? 30 : 25
                        const height = focused ? 30 : 25
                        return focused ? <HandsIcon style={{width: width, height: height, fill: COLOR.primary}}/> :
                            <HandsIcon style={{width: width, height: height, fill: COLOR.grey}}/>
                    },
                    labelStyle: {
                        color: COLOR.secondary,
                    },
                    tabBarItemStyle: {
                        padding: 7,
                    }
                }}
                name="NamazStack" component={NamazStack}/>
            <Tab.Screen
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: ({focused}) => {
                        const labelStyle = {
                            fontSize: 10, // Adjust the font size based on whether the tab is selected
                            color: focused ? COLOR.primary : COLOR.grey, // Adjust the color as well
                        };
                        return <MyText style={labelStyle}>Kerko</MyText>;
                    }, tabBarIcon: ({focused}) => {
                        const width = focused ? 32 : 27
                        const height = focused ? 32 : 27
                        const color = focused ? COLOR.primary : COLOR.grey
                        return <SearchIcon style={{width: width, height: height, fill: color}}/>
                    },
                    tabBarItemStyle: {
                        padding: 7,
                    }
                }}
                name="SearchStack" component={SearchStack}/>
            {/*<Tab.Screen name="SearchStack" component={SearchStack} />*/}
            {/*<Tab.Screen name="SearchStack" component={SearchStack} />*/}
            {/*<Tab.Screen name="SearchStack" component={SearchStack} />*/}
        </Tab.Navigator>
    )
}

export default TabStack;