import React from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // For navigation

const RoomCarousel = () => {
    const navigation = useNavigation(); // To navigate to different screens

    // Image data
    const rooms = [
        { id: '1', image: require('../assets/classroom.jpg'), screen: 'ClassroomScreen' },
        { id: '2', image: require('../assets/classroom1.jpg'), screen: 'Classroom1Screen' },
        { id: '3', image: require('../assets/classroom2.jpg'), screen: 'Classroom2Screen' },
        { id: '4', image: require('../assets/classroom1.jpg'), screen: 'Classroom1Screen' }
    ];

    // Render each item (image) in the carousel
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
    );

    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
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
