import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dmt3API from "../../services/dmt3API";
import { useFocusEffect } from "@react-navigation/native";

const CircleContainer = () => {
  const [temperature, setTemperature] = useState(20);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTemperature, setNewTemperature] = useState(temperature);

  const circleRadius = 110;
  const circumference = 2 * Math.PI * circleRadius;
  const percentage = (temperature - 16) / (30 - 16);
  const strokeDashoffset = circumference * (1 - percentage);

  const [fanStatus, setFanStatus] = useState(false)
  const [exhaustStatus, setExhaustStatus] = useState(false)

  const handleSave = async () => {
    setTemperature(newTemperature);
    setModalVisible(false);

    try {
      const data = await dmt3API.adjustACTempAPI(newTemperature);
      console.log(data);
      getTempAC()
    } catch (err) {
      console.log(err);
      Alert.alert("No running system", "Not connected to the system")
    }
  };

  const resetAll = () => {
    setFanStatus(false)
    setExhaustStatus(false)
  }

  const getComponentsStatus = async () => {
    try {

      const data = await dmt3API.getComponentsStatusAPI();
      setExhaustStatus(data.exhaust);
      setFanStatus(data.efan);

    } catch (err) {
      console.log(err);
      resetAll()
    }
  }


  const getTempAC = async () => {
    try {
      const data = await dmt3API.getCurrentACTempAPI();
      setTemperature(data)
      console.log("Asdsad");
      console.log(data)
      
    } catch (err) {
      console.log(err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getTempAC()
      getComponentsStatus()
    }, [])
  )


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.overrideButton} onPress={() => setModalVisible(true)}>
        <View style={styles.circleButton}>
          <MaterialCommunityIcons name="pencil" size={24} color="#ffffff" />
        </View>
      </TouchableOpacity>

      <Svg width="240" height="240" viewBox="0 0 240 240">
        {[...Array(60)].map((_, index) => {
          const angle = (index * 6 * Math.PI) / 180;
          const x1 = 120 + Math.cos(angle) * 110;
          const y1 = 120 + Math.sin(angle) * 110;
          const x2 = 120 + Math.cos(angle) * 105;
          const y2 = 120 + Math.sin(angle) * 105;
          return (
            <Path
              key={index}
              d={`M${x1},${y1} L${x2},${y2}`}
              stroke="#000000"
              strokeWidth="2"
            />
          );
        })}

        <Circle
          cx="120"
          cy="120"
          r={circleRadius}
          stroke="#4A90E2"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      <View style={styles.innerCircle}>
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.label}>Celsius</Text>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusCard}>
          <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.iconStyle} />
          <View>
            <Text style={styles.statusCardText}>Ceiling Fan</Text>
            <Text style={[styles.statusCardStatus, !fanStatus && { color: 'red' }]}>{fanStatus ? "Active" : "Inactive"}</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.iconStyle} />
          <View>
            <Text style={styles.statusCardText}>Exhaust</Text>
            <Text style={[styles.statusCardStatus, !exhaustStatus && { color: 'red' }]}>{exhaustStatus ? "Active" : "Inactive"}</Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Set Temperature</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(newTemperature)}
              onChangeText={text => setNewTemperature(Number(text))}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  overrideButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    position: "absolute",
    top: 27, // Adjusted to move up
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  label: {
    fontSize: 12,
    color: "#9eaab8",
    marginTop: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
    marginBottom: 20,
  },
  iconStyle: {
    marginRight: 10,
    marginLeft: 10,
  },
  statusCardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginRight: 10,
  },
  statusCardStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#4A90E2",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CircleContainer;
