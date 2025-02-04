import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const Menu = () => {
    const router = useRouter(); // Access the router instance

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/page1')}
            >
                <FontAwesome5 name="list-alt" size={17} color="#7c5a32" />
                <Text style={styles.menuText}>Përmbajtja</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/page2')}
            >
                <FontAwesome5 name="file-alt" size={17} color="#7c5a32" />
                <Text style={styles.menuText}>Shko te Faqja</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/page3')}
            >
                <FontAwesome5 name="eye" size={17} color="#7c5a32" />
                <Text style={styles.menuText}>Shfaq Fjalorin</Text>
            </TouchableOpacity>

            <LinearGradient
                colors={['#F5F5F5', '#EDEDED']}
                end={{ x: 0.1, y: 0.2 }}
                style={styles.centralItem}
            >
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Image
                        source={require('../assets/images/Zell.al-Green.png')}
                        style={styles.centralIcon}
                    />
                </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/page5')}
            >
                <FontAwesome5 name="font" size={17} color="#7c5a32" />
                <Text style={styles.menuText}>Pamja</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/Kerko')}
            >
                <FontAwesome5 name="search" size={17} color="#7c5a32" />
                <Text style={styles.menuText}>Kërko</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/page7')}
            >
                <FontAwesome5 name="save" size={17} color="#7c5a32" />
                <Text style={styles.menuText}>Lëviz Tekstin</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    menuContainer: {
        height: 64,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FDFCF8',
        paddingVertical: 10,
        zIndex: 1,
        position: 'absolute',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
    },
    menuText: {
        fontSize: 6,
        color: '#7c5a32',
        marginTop: 7,
        textAlign: 'center',
    },
    centralItem: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centralIcon: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        zIndex: 2,
        marginTop: 15,
    },
});
