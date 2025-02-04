import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { QiblaIcon } from '../../assets/icons/svg/qibla-icon';
import HandsIcon from '../../assets/icons/svg/hands-icon';
import BookIcon from '../../assets/icons/svg/book-icon';
import { SearchIcon } from '../../assets/icons/svg/search-icon';
import { MenuIcon } from '../../assets/icons/svg/MenuIcon';
import { COLOR } from '../../common/colors/color';
import SideMenu from '../../components/SideMenu/SideMenu';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const createTabBarIcon = (
        IconComponent,
        focusedColor,
        unfocusedColor,
        size
    ) => {
        return ({ focused }) => {
            const width = focused ? size.width : size.width - 5;
            const height = focused ? size.height : size.height - 5;
            return (
                <IconComponent
                    style={{
                        width,
                        height,
                        fill: focused ? focusedColor : unfocusedColor,
                        padding: 4,
                    }}
                />
            );
        };
    };

    const createTabBarLabel = (label) => {
        return ({ focused }) => {
            return (
                <Text
                    style={{
                        fontSize: 12,
                        color: focused ? COLOR.primary : COLOR.grey,
                    }}
                >
                    {label}
                </Text>
            );
        };
    };

    const renderMenuTabButton = () => {
        return (
            <TouchableOpacity
                style={styles.menuTabButton}
                onPress={() => setIsDrawerOpen((prev) => !prev)}
            >
                <MenuIcon style={{ width: 25, height: 25, fill: COLOR.grey }} />
                <Text style={{ fontSize: 12, color: COLOR.grey }}>Menu</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Tabs
                initialRouteName="index"
                backBehavior="history"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    tabBarStyle: Platform.select({
                        ios: {
                            backgroundColor: 'white',
                            position: 'absolute',
                            height: 80,
                        },
                        default: {
                            height: 60,
                        },
                    }),
                }}
            >
                <Tabs.Screen
                    name="Menu"
                    options={{
                        tabBarButton: renderMenuTabButton,
                        tabBarLabel: createTabBarLabel('Menu'),
                        tabBarIcon: createTabBarIcon(
                            MenuIcon,
                            COLOR.primary,
                            COLOR.grey,
                            { width: 25, height: 25 }
                        ),
                        tabBarItemStyle: { paddingTop: 4 },
                    }}
                />
                <Tabs.Screen
                    name="Qibla"
                    options={{
                        title: 'Qibla',
                        tabBarLabel: createTabBarLabel('Qibla'),
                        tabBarIcon: createTabBarIcon(
                            QiblaIcon,
                            COLOR.primary,
                            COLOR.grey,
                            { width: 58, height: 58 }
                        ),
                        tabBarItemStyle: { paddingTop: 4 },
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Kryesore',
                        tabBarLabel: createTabBarLabel('Kryesore'),
                        tabBarIcon: createTabBarIcon(
                            BookIcon,
                            COLOR.primary,
                            COLOR.grey,
                            { width: 30, height: 30 }
                        ),
                        tabBarItemStyle: { paddingTop: 4 },
                    }}
                />
                <Tabs.Screen
                    name="Namaz"
                    options={{
                        title: 'Namaz',
                        tabBarLabel: createTabBarLabel('Namaz'),
                        tabBarIcon: createTabBarIcon(
                            HandsIcon,
                            COLOR.primary,
                            COLOR.grey,
                            { width: 28, height: 28 }
                        ),
                        tabBarItemStyle: { paddingTop: 4 },
                    }}
                />
                <Tabs.Screen
                    name="Kerko"
                    options={{
                        title: 'Kerko',
                        tabBarLabel: createTabBarLabel('Kerko'),
                        tabBarIcon: createTabBarIcon(
                            SearchIcon,
                            COLOR.primary,
                            COLOR.grey,
                            { width: 28, height: 28 }
                        ),
                        tabBarItemStyle: { paddingTop: 4 },
                    }}
                />
                <Tabs.Screen
                    name="Socials"
                    options={{
                        href: null,
                        title: 'Socials',
                    }}
                />
                <Tabs.Screen
                    name="Risale"
                    options={{
                        href: null,
                        title: 'Risale',
                    }}
                />
                <Tabs.Screen
                    name="RisaleCollection"
                    options={{
                        href: null,
                        title: 'Risale',
                    }}
                />
            </Tabs>
            {isDrawerOpen && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setIsDrawerOpen(false)}
                />
            )}
            <SideMenu
                visible={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    menuTabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 4,
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    },
});
