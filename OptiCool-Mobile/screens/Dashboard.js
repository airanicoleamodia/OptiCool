import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Avatar, Button, TextInput, FAB } from 'react-native-paper';
import axios from 'axios'; // Import axios

const baseURL = 'http://dataservice.accuweather.com';  // AccuWeather API base URL
const apiKey = 'w7QpVKXN9JLuj6zTFcwBo6OqvgfQG1vW';  // Replace with your API key
const locationKey = '759349';  


export default function Dashboard() {
    const { user } = useSelector(state => state.auth);
    const [userData, setUserData] = useState({avatar: ''});
    const [weatherData, setWeatherData] = useState(null);

    // Your API key from AccuWeather
    const API_KEY = 'VamNFemH3boIKHxrAXCTfUD0u5LiYytV';
    const baseURL = 'http://dataservice.accuweather.com';

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
        const { data } = await axios.get(`${baseURL}/currentconditions/v1/${locationKey}`, {
            params: {
                apikey: apiKey,
                language: 'en-us',
                details: true, // Fetch detailed weather info
            },
        });
        setWeatherData(data[0]);  // Assuming the data is in an array
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

useFocusEffect(
    useCallback(() => {
        setUserOriginalInfo();
        fetchWeatherData();  // Fetch weather data on focus
    }, [user])
);
    
    const setUserOriginalInfo = async () => {

        const { data } = await axios.get(`${baseURL}/users/getsingle/${user._id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })

        setUserData({
            avatar: data.user.avatar,
        })
    }

    
    useFocusEffect(
        useCallback(() => {
            setUserOriginalInfo()
        }, [user])
    )

    
    return (
        <SafeAreaView style={styles.container}>
            {/* Make sure the ImageBackground takes up the whole screen */}
            <ImageBackground
                source={require('../assets/opticool.png')} // Adjust the path to the assets folder
                style={styles.background}
                resizeMode="cover"
            >
                {/* Content goes here, it will be on top of the image */}
                {/* Header Section */}
                <Text style={styles.intro}>Manage Room</Text>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hey, <Text style={styles.name}>{user.username}</Text></Text>
                    <Avatar.Image
                        source={{ uri: user.avatar?.url || 'https://example.com/default-avatar.png' }} // Use user's avatar or a default one
                        size={40}
                        style={styles.avatar}
                    />
                </View>

                {/* Status Cards */}
                <View style={styles.singleStatusCard}>
                    <View style={styles.statusItem}>
                        <Text style={styles.statusText}>humidity</Text>
                        <Text style={styles.statusValue}>80%</Text>
                    </View>
                    <View style={styles.statusItem}>
                        <Text style={styles.statusText}>energy</Text>
                        <Text style={styles.statusValue}>60 kWh</Text>
                    </View>
                    <View style={styles.statusItem}>
                        <Text style={styles.statusText}>temperature</Text>
                        <Text style={styles.statusValue}>31°C</Text>
                    </View>
                </View>

                {/* City Temperature & Appliance Status */}
                <View style={styles.mainRow}>
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityTemp}>27.60°</Text>
                        <Text style={styles.cityName}>Taguig City</Text>
                    </View>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Air Condition</Text>
                        <Text style={styles.applianceStatus}>Status: Active</Text>
                    </View>
                </View>

                <View style={styles.mainRow}>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Fans</Text>
                        <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
                    </View>
                    <View style={styles.emptyCard} />
                </View>

                {/* Temperature Details */}
                <View style={styles.mainRow}>
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityTemp}>{weatherData?.Temperature?.Metric?.Value || '--'}°</Text>
                        <Text style={styles.cityName}>Taguig City</Text>
                    </View>
                    <View style={styles.applianceCard}>
                        <Text style={styles.applianceText}>Air Condition</Text>
                        <Text style={styles.applianceStatus}>Status: Active</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1, // This will make the ImageBackground take the full screen
        justifyContent: 'flex-start', // Align the content from the top
        padding: 16, // Add padding to ensure content is not too close to edges
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 8,
    },
    intro: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'grey',
        marginTop: 10,
        marginBottom: -16,
        marginLeft: 9,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'normal', // This makes "Hey" thinner
        color: '#050a20', // Ensure text is visible on background
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold', // This makes "John" bolder
        color: '#4f5e70', // Ensure text is visible on background
    },
    avatar: {
        marginTop: -5,
        marginRight: 5,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    singleStatusCard: {
        backgroundColor: '#ebf2fa', // Unified background for the single box
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row', // Arrange items in a row
        justifyContent: 'space-around', // Space out items evenly
        alignItems: 'center', // Align items vertically in the center
        marginBottom: 20,
    },
    statusItem: {
        alignItems: 'center', // Center align text inside each item
        flex: 1, // Ensure each item takes up equal space
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#9eaab8',
        marginLeft: 10,
    },
    statusValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4f5e70',
        marginLeft: 30,
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 15,
    },
    weatherCard: {
        backgroundColor: '#b3e5fc',
        borderRadius: 10,
        padding: 16,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    cityTemp: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    cityName: {
        fontSize: 16,
        color: '#000',
    },
    applianceCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        flex: 1,
        alignItems: 'center',
    },
    applianceText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    applianceStatus: {
        color: 'green',
    },
    applianceStatusInactive: {
        color: 'red',
    },
    emptyCard: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 16,
        flex: 1,
        marginLeft: 10,
    },
    tempRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tempCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    tempLabel: {
        fontSize: 16,
    },
    tempValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});