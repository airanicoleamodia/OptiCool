import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoomCarousel = () => {
    const navigation = useNavigation();
    const isOnline = true; // Always set to Online

    const rooms = [
        { id: '1', image: require('../../assets/DMTRoom2.jpg'), screen: 'DMTRoom' },
        { id: '2', image: require('../../assets/DMTRoom.jpg'), screen: 'Classroom1Screen' },
        { id: '3', image: require('../../assets/DMTRoom1.jpg'), screen: 'Classroom2Screen' },
        { id: '4', image: require('../../assets/DMTRoom.jpg'), screen: 'Classroom1Screen' }
    ];

    const handleRoomPress = (room) => {
        console.log(`Room ${room.id} clicked`);
        // Do not navigate to any screen for now
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleRoomPress(item)} style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={[styles.statusContainer, styles.online]}>
                <View style={[styles.circle, styles.green]} />
                <Text style={styles.statusText}>Offline</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.wrapper}>
            <Text style={styles.roomText}>Room</Text>
            <View style={styles.container}>
                <FlatList
                    data={rooms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 25,
    },
    roomText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4f5e70',
        marginBottom: 10,
        marginLeft: 15,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 190,
        borderRadius: 10,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 0,
        paddingHorizontal: 15,
        position: 'absolute',
        top: 10, // Move to top
        left: 10, // Move to left
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    },
    online: {
        backgroundColor: 'white',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    green: {
        backgroundColor: 'red',
    },
    statusText: {
        fontWeight: 'bold',
        color: 'black',
    },
});

export default RoomCarousel;
