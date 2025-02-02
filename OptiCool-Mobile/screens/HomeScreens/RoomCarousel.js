import React from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import DMTRoom from '../RoomDetails/DMTRoom';
import { useNavigation } from '@react-navigation/native';  // For navigation

const RoomCarousel = () => {
    const navigation = useNavigation(); // To navigate to different screens

    // Image data
    const rooms = [
        { id: '1', image: require('../../assets/classroom.jpg'), screen: 'DMTRoom' },
        { id: '2', image: require('../../assets/classroom1.jpg'), screen: 'Classroom1Screen' },
        { id: '3', image: require('../../assets/classroom2.jpg'), screen: 'Classroom2Screen' },
        { id: '4', image: require('../../assets/classroom1.jpg'), screen: 'Classroom1Screen' }
    ];

    // Render each item (image) in the carousel
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.image} style={styles.image} />
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
                    horizontal={true} // Enable horizontal scrolling
                    showsHorizontalScrollIndicator={false} // Hide scroll indicator
                    contentContainerStyle={styles.flatListContainer} // Style for the content inside FlatList
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
    image: {
        width: 250, // Adjust for image width
        height: 190, // Adjust for image height
        borderRadius: 10,
        marginHorizontal: 10, // Space between images
    },
});

export default RoomCarousel;
