import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ZellnerIcon from '../../assets/images/Zell.al-Green.png';

const screenWidth = Dimensions.get('window').width;
const DRAWER_WIDTH = screenWidth * 0.65;
const THEME_COLOR = '#008B8B';

const MENU_ITEMS = [
    { icon: 'document-text-outline', label: 'Terms', link: '/terms' },
    {
        icon: 'book-outline',
        label: 'Encyclopedic Information',
        link: '/encyclopedic-info',
    },
    { icon: 'list-outline', label: 'Home', link: '/index' },
    {
        icon: 'person-outline',
        label: 'Who is Said Nursi?',
        link: '/who-is-said-nursi',
    },
    {
        icon: 'calendar-outline',
        label: 'Writing Dates',
        link: '/writing-dates',
    },
    { icon: 'clipboard-outline', label: 'Notes', link: '/notes' },
    { icon: 'bookmark-outline', label: 'Bookmarks', link: '/bookmarks' },
    { icon: 'settings-outline', label: 'Settings', link: '/settings' },
    { icon: 'people-outline', label: 'Switch User', link: '/switch-user' },
    { icon: 'help-circle-outline', label: 'Help', link: '/help' },
    { icon: 'information-circle-outline', label: 'About', link: '/about' },
];

const BG_SIZE = Platform.select({ ios: 33, android: 30 });
const BG_RADIUS = Platform.select({ ios: 10, android: 8 });

export default function SideMenu({ visible, onClose }) {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(progress, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(progress, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, progress]);

    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-DRAWER_WIDTH, 0],
    });

    const backdropOpacity = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.1],
    });

    const handleMenuItemPress = (item) => {
        onClose();
        console.log('Pressed:', item.link);
    };

    return (
        <>
            <Animated.View
                pointerEvents={visible ? 'auto' : 'none'}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        opacity: backdropOpacity,
                    },
                ]}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            <Animated.View
                style={[
                    styles.menuContainer,
                    {
                        width: DRAWER_WIDTH,
                        transform: [{ translateX }],
                    },
                ]}
            >
                <View style={styles.menuContent}>
                    <View style={styles.logoContainer}>
                        <Image source={ZellnerIcon} style={styles.logo} />
                    </View>
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => handleMenuItemPress(item)}
                        >
                            <View style={styles.iconBg}>
                                <Ionicons
                                    name={item.icon}
                                    size={18}
                                    color={THEME_COLOR}
                                />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 999,
        elevation: 10,
    },
    menuContent: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconBg: {
        width: BG_SIZE,
        height: BG_SIZE,
        borderRadius: BG_RADIUS,
        backgroundColor: '#E7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    menuLabel: {
        fontSize: 15,
        color: '#333',
    },
    logoContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#E7F7F7',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 6,
    },
    logo: {
        width: '60%',
        height: 60,
        resizeMode: 'contain',
        paddingBottom: 12,
    },
});
