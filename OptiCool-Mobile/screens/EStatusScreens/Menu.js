import React, { useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import dmt3API from "../../services/dmt3API";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const [selected, setSelected] = useState("AC");
  const [submitting, setSubmitting] = useState(false);
  const [applianceStatus, setApplianceStatus] = useState({
    AC: { AC: false }, // Set AC to inactive by default
    Fan: { "Fan 1": true },
    Exhaust: { "Exhaust 1": true },
    Blower: { "Blower 1": true },
  });
  const [isConnected, setIsConnected] = useState(true); // State to track connection status
  const [circleSize, setCircleSize] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [reportedAppliance, setReportedAppliance] = useState(""); // State for reported appliance

  const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => false, // Disable pan responder
  });

  const menuItems = [
    { name: "AC", icon: "air-conditioner" },
    { name: "Fan", icon: "fan" },
    { name: "Exhaust", icon: "fan-off" },
    { name: "Blower", icon: "air-filter" },
  ];

  const appliances = {
    AC: [{ name: "AC", status: "Active" }],
    Fan: [{ name: "Fan", status: "Active" }],
    Exhaust: [{ name: "Exhaust", status: "Active" }],
    Blower: [{ name: "Blower", status: "Active" }],
  };

  const toggleAppliance = (category, appliance) => {
    if (!isConnected) {
      Alert.alert(
        "Warning",
        "Cannot switch on appliances when not connected to the system"
      );
      return;
    }
    setApplianceStatus((prevStatus) => ({
      ...prevStatus,
      [category]: {
        ...prevStatus[category],
        [appliance]: !prevStatus[category][appliance],
      },
    }));
    setStatusToDevice(appliance, applianceStatus);
  };

  const setStatusToDevice = async (device, applianceStatus) => {
    try {
      await dmt3API.turnOffDevice(device, applianceStatus);
    } catch (err) {
      console.log(err);
      Alert.alert("No running system", "Not connected to the system");
    }
  };

  const handleReport = async (appliance, status) => {
    console.log("handleReport called for:", appliance, status); // Debug log
    setSubmitting(true);

    try {
      const { data } = await axios.post(`${baseURL}/ereports/ereport`, {
        appliance,
        status,
      });

      console.log("API Response:", data); // Debug log

      if (data.success) {
        setReportedAppliance(appliance);
        setModalVisible(true); // Ensure modal is triggered
        console.log("Modal set to visible"); // Debug log
      } else {
        console.log("Error response:", data.message);
        Alert.alert("Error", data.message, [{ text: "OK" }]);
      }
    } catch (error) {
      console.log("Network error:", error);
      Alert.alert(
        "Network Error",
        "Could not send the report. Please try again later.",
        [{ text: "OK" }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  const confirmReport = (appliance, status) => {
    console.log("confirmReport called"); // Debug log
    Alert.alert(
      "Confirm Report",
      `Are you sure you want to report ${appliance} as ${status}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleReport(appliance, status),
        },
      ],
      { cancelable: false }
    );
  };

  const getComponentsStatus = async () => {
    try {
      const data = await dmt3API.getComponentsStatusAPI();
      setIsConnected(true); // Set connection status to true if data is fetched successfully

      if (Boolean(data.ac1) !== applianceStatus.AC.AC) {
        toggleAppliance("AC", "AC");
      }

      if (Boolean(data.blower) !== applianceStatus.Blower["Blower 1"]) {
        toggleAppliance("Blower", "Blower 1");
      }

      if (Boolean(data.efan) !== applianceStatus.Fan["Fan 1"]) {
        toggleAppliance("Fan", "Fan 1");
      }

      if (Boolean(data.exhaust) !== applianceStatus.Exhaust["Exhaust 1"]) {
        toggleAppliance("Exhaust", "Exhaust 1");
      }
    } catch (err) {
      console.log(err);
      setIsConnected(false); // Set connection status to false if there is an error
    }
  };

  useFocusEffect(
    useCallback(() => {
      getComponentsStatus();
    }, [])
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.container}>
        {/* Modal for reporting */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {reportedAppliance} has been reported.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Animated.View style={styles.appliancesContainer}>
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.menuItem,
                  selected === item.name && styles.selectedItem,
                  item.name === "AC" && styles.acButton,
                  item.name === "Blower" && styles.blowerButton,
                ]}
                onPress={() => setSelected(item.name)}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={selected === item.name ? "#ffffff" : "#9eaab8"}
                />
                <Text
                  style={[
                    styles.menuText,
                    selected === item.name && styles.selectedText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.pullBar} />
          {appliances[selected].map((appliance, index) => (
            <View key={index}>
              <View style={styles.applianceRow}>
                <MaterialCommunityIcons
                  name="fan"
                  size={30}
                  color="#6C9AB2"
                  style={styles.contentIconStyle}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.contentCardText}>{appliance.name}</Text>
                  <Text
                    style={[
                      styles.contentCardStatus,
                      {
                        color: applianceStatus[selected][appliance.name]
                          ? "green"
                          : "red",
                      },
                    ]}
                  >
                    {applianceStatus[selected][appliance.name] ? "On" : "Off"}
                  </Text>
                </View>
                <View style={styles.cardbuttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.powerButton,
                      {
                        backgroundColor: applianceStatus[selected][
                          appliance.name
                        ]
                          ? "#4CAF50"
                          : "#FF5252",
                      },
                    ]}
                    onPress={() => toggleAppliance(selected, appliance.name)}
                  >
                    <MaterialCommunityIcons
                      name={
                        applianceStatus[selected][appliance.name]
                          ? "power"
                          : "power-off"
                      }
                      size={25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() =>
                      confirmReport(
                        appliance.name,
                        applianceStatus[selected][appliance.name]
                          ? "Active"
                          : "Inactive"
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {index < appliances[selected].length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: "100%",
  },
  menuItem: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ebedf0",
    borderRadius: 10,
    width: 70,
    marginTop: 0,
  },
  acButton: {
    borderTopLeftRadius: 20, // Curve the top left corner
  },
  blowerButton: {
    borderTopRightRadius: 20, // Curve the top right corner
  },
  selectedItem: {
    backgroundColor: "#2F80ED",
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: "#9eaab8",
  },
  selectedText: {
    color: "#ffffff",
  },
  appliancesContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0, // Increased padding
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    minHeight: 300, // Ensures menu remains at least 300 height
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures the ScrollView takes the full height
  },
  // pullBar: {
  //   width: 40,
  //   height: 5,
  //   backgroundColor: "#000000",
  //   borderRadius: 2.5,
  //   alignSelf: "center",
  //   marginVertical: 10,
  // },
  applianceRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  contentCardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
  contentCardStatus: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  contentIconStyle: {
    marginRight: 20,
    marginLeft: 10,
  },
  cardbuttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: "auto",
  },
  powerButton: {
    borderRadius: 6,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  reportButton: {
    backgroundColor: "red",
    borderRadius: 6,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  reportButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reportButtonBelowCircle: {
    backgroundColor: "red",
    borderRadius: 6,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
});

export default Menu;
