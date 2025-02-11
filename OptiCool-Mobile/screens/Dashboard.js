import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Avatar, Button, TextInput, FAB } from "react-native-paper";
import axios from "axios";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import AppliancesScreen from "./HomeScreens/AppliancesScreen";
import RoomCarousel from "./HomeScreens/RoomCarousel";
import baseURL from "../assets/common/baseUrl";
import StatusCard from "./HomeScreens/StatusCard";
import MainRow from "./HomeScreens/MainRow";
import DMT3ROOM from "../services/dmt3API"
import dmt3API from "../services/dmt3API";
// import UpButton from "../assets/common/UpButton";

export default function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({ avatar: "" });
  const [weatherData, setWeatherData] = useState(null);
  const [roomTemp, setRoomTemp] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const navigation = useNavigation();

  const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown state
  const AccuweatherbaseURL = "https://dataservice.accuweather.com";
  const apiKey = "I8m0OklfM6lIEJGIAl7Sa96aZSGY6Enm";
  const locationKey = "759349";
  
  const fetchWeatherData = async () => {
    const currentTime = Date.now();
    if (lastRequestTime && currentTime - lastRequestTime < 2 * 60 * 60 * 1000) {
      console.log("API call frequency limit reached. Try again after 2 hours.");
      return;
    }

    try {
      console.log("Fetching weather data...");
      setIsRequesting(true);
      const { data } = await axios.get(
        `${AccuweatherbaseURL}/currentconditions/v1/${locationKey}`,
        {
          params: {
            apikey: apiKey,
            language: "en-us",
            details: true,
          },
        }
      );
      console.log("Weather data fetched:", data);
      if (data && data.length > 0) {
        setWeatherData(data[0]);
        setLastRequestTime(currentTime);
      } else {
        console.error("No weather data returned.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("Weather data not found. Please check the location key.");
        } else if (error.response.status === 503) {
          console.error("Service is temporarily unavailable.");
        } else {
          console.error("Error fetching weather data:", error.response.status);
        }
      } else {
        console.error("Network error or other issue:", error.message);
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const setUserOriginalInfo = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/users/getsingle/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData({
        avatar: data.user.avatar,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("User not found.");
        console.error("Error fetching user data:", error.response);
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  // Handle dropdown option selection
  const handleOptionSelect = (option) => {
    setDropdownVisible(false);
    console.log(`${option} selected`);

    // Make sure you have a screen called 'NotifTestScreen' in your navigation setup
    navigation.navigate(option);
  };

  const handleUpButtonPress = () => {
    // Handle the button press
  };

  const getRoomTemp = async () => {
    try {
      const data = await dmt3API.getDevicesDataAPI();
      console.log(data);
      setRoomTemp(data.inside.temperature);
    } catch (err) {
      console.error("Error fetching room temperature:", err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user && user._id) {
        setUserOriginalInfo();
        fetchWeatherData();
        getRoomTemp()
      } else {
        console.error("Invalid user ID.");
      }
    }, [user])
  );

  const textLength = weatherData?.WeatherText?.length || 0;

  const dynamicStyles = StyleSheet.create({
    tempLabel: {
      fontSize: textLength > 12 ? 11 : textLength > 10 ? 12 : 16,
      fontWeight: "bold",
      color: "#4f5e70",
      marginLeft: 30,
    },
  });

  const getPowerConsumption = async () => {
    dmt3API.getPowerConsumptionAPI("2024-10-01", "2024-10-20");
  }

  useFocusEffect(
    useCallback(() => {
      getPowerConsumption()
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* <UpButton onPress={handleUpButtonPress} style={styles.upButton} /> */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* <ImageBackground
          source={require("../assets/opticool.png")}
          style={styles.background}
          resizeMode="cover"
        > */}

        <Text style={styles.intro}>Manage Room</Text>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.greeting}>
              Hey, <Text style={styles.name}>{user.username}</Text>
            </Text>
          </View>
          {/* Alert Icon (beside avatar) */}

          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.avatarContainer}
          >
            <Avatar.Image
              source={{
                uri:
                  user.avatar?.url || "https://example.com/default-avatar.png",
              }}
              size={40}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <MaterialCommunityIcons
          name="bell"
          size={24}
          color="#000000"
          onPress={() => alert("Alert clicked!")}
          style={styles.alertIconContainer}
        />
        {/* Dropdown Menu */}
        {isDropdownVisible && (
          <Modal
            transparent={true}
            animationType="none"
            visible={isDropdownVisible}
            onRequestClose={toggleDropdown}
          >
            <Pressable style={styles.overlay} onPress={toggleDropdown} />
            <View style={styles.dropdown}>
              <TouchableOpacity
                onPress={() => handleOptionSelect("Profile")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelect("Settings")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelect("NotifScreen")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Notif Test</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionSelect("Logout")}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        <StatusCard />

        <RoomCarousel />

        <AppliancesScreen />

        <MainRow weatherData={weatherData} />

        <View style={styles.singleStatusCard}>
          <View style={styles.statusItem}>
            <Text style={styles.statusText}>Humidity</Text>
            <Text style={styles.statusValue}>
              {weatherData?.RelativeHumidity}%
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusText}>Feels like</Text>
            <Text style={styles.statusValue}>
              {weatherData?.RealFeelTemperature?.Metric?.Value || "--"}°C
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusText}>Condition</Text>
            <Text style={dynamicStyles.tempLabel}>
              {weatherData?.WeatherText}
            </Text>
          </View>
        </View>

        {/* Temperature Cards */}
        <View style={styles.temperatureContainer}>
          {/* Room Temperature */}
          <View style={[styles.tempCard, styles.roomTemperature]}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={styles.tempLabel}>Room Temperature</Text>
            <Text style={styles.tempValue}>
              {roomTemp || "--"}°C
            </Text>
          </View>

          {/* Outside Temperature */}
          <View style={[styles.tempCard, styles.outsideTemperature]}>
            <Ionicons name="sunny-outline" size={24} color="white" />
            <Text style={styles.tempLabel}>Outside Temperature</Text>
            <Text style={styles.tempValue}>
              {weatherData?.Temperature?.Metric?.Value || "--"}°C
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebedf0",
  },
  scrollContainer: {
    flexGrow: 1, // Allow the ScrollView content to grow
    paddingBottom: 30, // Add padding at the bottom for better spacing
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  upButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    width: "100%", // Ensure it spans the entire width
    paddingHorizontal: 16, // Add some horizontal padding
  },
  intro: {
    fontSize: 11,
    fontWeight: "bold",
    color: "grey",
    marginTop: 20,
    marginBottom: -25,
    marginRight: 240,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#050a20",
    alignSelf: "flex-start", // Align to the left
    marginLeft: 7,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4f5e70",
  },
  alertIconContainer: {
    marginLeft: 170,
    marginTop: -40, // Space between alert icon and avatar
  },
  avatar: {
    marginTop: -10,
    marginLeft: 30,
    marginRight: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdown: {
    position: "absolute",
    top: 60, // Adjust this based on your header height
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownItem: {
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  singleStatusCard: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 15,
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-around",
    alignItems: "center", // Align items vertically in the center
    marginTop: 10,
    marginBottom: 1,
    width: "88%",
  },
  statusItem: {
    alignItems: "center", // Center align text inside each item
    flex: 1, // Ensure each item takes up equal space
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#9eaab8",
    textAlign: "center",
    width: "100%",
  },
  statusValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f5e70",
    textAlign: "center",
    width: "100%",
  },
  WeatherText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f5e70",
    textAlign: "center",
    width: "100%",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 0,
  },

  weatherCard: {
    backgroundColor: "#b3e5fc",
    borderRadius: 20,
    padding: 16,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cityTemp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  cityName: {
    fontSize: 16,
    color: "#000",
  },
  applianceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  applianceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  applianceStatus: {
    color: "green",
  },
  applianceStatusInactive: {
    color: "red",
  },
  emptyCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    marginLeft: 10,
  },
  tempRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  temperatureContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
  tempCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "88%",
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
  roomTemperature: {
    backgroundColor: "#9BA9F3",
  },
  outsideTemperature: {
    backgroundColor: "#FBC6A4",
  },
  tempLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
  },
  tempValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
