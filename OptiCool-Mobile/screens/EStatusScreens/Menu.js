import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, PanResponder, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircleContainer from './CircleContainer';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import dmt3API from '../../services/dmt3API';
import { useFocusEffect } from '@react-navigation/native';

const Menu = () => {
  const [selected, setSelected] = useState('AC');
  const [submitting, setSubmitting] = useState(false);
  const [applianceStatus, setApplianceStatus] = useState({
    AC: { 'AC': true, 'AC 2': false },
    Fan: { 'Fan 1': true },
    Exhaust: { 'Exhaust 1': true },
    Blower: { 'Blower 1': true }
  });
  const [circleSize, setCircleSize] = useState(new Animated.Value(1));

  const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy < 0) { // Only allow upward movement
        Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(
          event,
          { dy: Math.max(-300, gestureState.dy) }
        );
        Animated.timing(circleSize, {
          toValue: 1 + gestureState.dy / 600,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy < -150) {
        Animated.spring(pan, { toValue: { x: 0, y: -300 }, useNativeDriver: false }).start(); // Expand upwards
        Animated.spring(circleSize, { toValue: 0.5, useNativeDriver: false }).start();
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start(); // Return to normal position
        Animated.spring(circleSize, { toValue: 1, useNativeDriver: false }).start();
      }
    },
  });

  const menuItems = [
    { name: 'AC', icon: 'air-conditioner' },
    { name: 'Fan', icon: 'fan' },
    { name: 'Exhaust', icon: 'fan-off' },
    { name: 'Blower', icon: 'air-filter' }
  ];

  const appliances = {
    AC: [
      { name: 'AC', status: 'Active' },
      { name: 'AC 2', status: 'Inactive' }
    ],
    Fan: [
      { name: 'Fan', status: 'Active' }
    ],
    Exhaust: [
      { name: 'Exhaust', status: 'Active' }
    ],
    Blower: [
      { name: 'Blower', status: 'Active' }
    ]
  };

  const toggleAppliance = (category, appliance) => {
    setStatusToDevice(appliance, applianceStatus)
    setApplianceStatus(prevStatus => ({
      ...prevStatus,
      [category]: {
        ...prevStatus[category],
        [appliance]: !prevStatus[category][appliance]
      }
    }));
  };

  const setStatusToDevice = async (device, applianceStatus) => {
    try {
      await dmt3API.turnOffDevice(device, applianceStatus);
    } catch (err) {
      console.log(err);
      Alert.alert("No running system", "Not connected to the system")
    }
  }

  const handleReport = async (appliance, status, setSubmitting) => {
    setSubmitting(true);

    try {
      const { data } = await axios.post(`${baseURL}/ereports/ereport`, { appliance, status });

      if (data.success) {
        Alert.alert(
          'Report',
          data.message,
          [{ text: 'OK', onPress: () => console.log(`${appliance} report acknowledged`) }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error',
          data.message,
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    } catch (error) {
      Alert.alert(
        'Network Error',
        'Could not send the report. Please try again later.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getComponentsStatus = async () => {
    try {

      const data = await dmt3API.getComponentsStatusAPI();

      if (Boolean(data.ac1) !== applianceStatus.AC.AC) {
        toggleAppliance("AC", "AC");
      }

      if (Boolean(data.ac2) !== applianceStatus.AC['AC 2']) {
        toggleAppliance("AC", "AC 2");
      }

      if (Boolean(data.blower) !== applianceStatus.Blower['Blower 1']) {
        toggleAppliance("Blower", "Blower 1");
      }

      if (Boolean(data.efan) !== applianceStatus.Fan['Fan 1']) {
        toggleAppliance("Fan", "Fan 1");
      }

      if (Boolean(data.exhaust) !== applianceStatus.Exhaust['Exhaust 1']) {
        toggleAppliance("Exhaust", "Exhaust 1");
      }

    } catch (err) {
      console.log(err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getComponentsStatus();
    }, [])
  )

  return (
    <View style={styles.container}>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[styles.menuItem, selected === item.name && styles.selectedItem]}
            onPress={() => setSelected(item.name)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={selected === item.name ? '#ffffff' : '#9eaab8'}
            />
            <Text style={[styles.menuText, selected === item.name && styles.selectedText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View style={[styles.circleContainer, { transform: [{ scale: circleSize }] }]}>
        <CircleContainer />
      </Animated.View>
      <Animated.View
        style={[styles.appliancesContainer, { transform: [{ translateY: pan.y }], shadowOpacity: pan.y.interpolate({ inputRange: [0, 600], outputRange: [0, 0.5] }) }]}
        {...panResponder.panHandlers}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.pullBar} />
          {appliances[selected].map((appliance, index) => (
            <View key={index}>
              <View style={styles.applianceRow}>
                <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
                <View style={styles.textContainer}>
                  <Text style={styles.contentCardText}>{appliance.name}</Text>
                  <Text style={[styles.contentCardStatus, { color: applianceStatus[selected][appliance.name] ? 'green' : 'red' }]}>
                    {applianceStatus[selected][appliance.name] ? 'On' : 'Off'}
                  </Text>
                </View>
                <View style={styles.cardbuttonContainer}>
                  <TouchableOpacity
                    style={[styles.powerButton, { backgroundColor: applianceStatus[selected][appliance.name] ? '#4CAF50' : '#FF5252' }]}
                    onPress={() => toggleAppliance(selected, appliance.name)}
                  >
                    <MaterialCommunityIcons
                      name={applianceStatus[selected][appliance.name] ? 'power' : 'power-off'}
                      size={25}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => handleReport(appliance.name, applianceStatus[selected][appliance.name] ? 'Active' : 'Inactive', setSubmitting)}
                  >
                    <MaterialCommunityIcons name="alert-circle" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              {index < appliances[selected].length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ebedf0',
    borderRadius: 10,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 70,
    marginTop: 25,
  },
  selectedItem: {
    backgroundColor: '#2F80ED',
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: '#9eaab8'
  },
  selectedText: {
    color: '#ffffff'
  },
  circleContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appliancesContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0, // Increased padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    minHeight: 600, // Ensures menu remains at least 300 height
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures the ScrollView takes the full height
  },
  pullBar: {
    width: 40,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
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
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    marginRight: 10
  },
  contentCardStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  contentIconStyle: {
    marginRight: 20,
    marginLeft: 10,
  },
  cardbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  powerButton: {
    borderRadius: 6,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  reportButton: {
    backgroundColor: 'red',
    borderRadius: 6,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
});

export default Menu;
