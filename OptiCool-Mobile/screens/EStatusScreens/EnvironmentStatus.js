import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, ScrollView, Animated, PanResponder } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';
import Menu from './Menu';
import CircleContainer from './CircleContainer';
import dmt3API from '../../services/dmt3API';

export default function EnvironmentStatus() {
  const navigation = useNavigation();
  const [submitting, setSubmitting] = useState(false);
  const [isOn, setIsOn] = useState(false); // State to track the power status
  const [fan1On, setFan1On] = useState(false);
  const [fan2On, setFan2On] = useState(false);
  const [fan3On, setFan3On] = useState(false);
  const [ACOn, setACOn] = useState(false);
  const [AC2On, setAC2On] = useState(false);

  const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.spring(pan, { toValue: { x: 0, y: 300 }, useNativeDriver: false }).start();
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  // Function to toggle power status
  const togglePower = () => {
    setIsOn(!isOn);
  };

  // Function to toggle power status for a specific fan
  const toggleFanPower = (fanNumber) => {
    switch (fanNumber) {
      case 1:
        setFan1On(!fan1On);
        break;
      case 2:
        setFan2On(!fan2On);
        break;
      case 3:
        setFan3On(!fan3On);
        break;
      case 4:
        setACOn(!ACOn);
        break;
      case 5:
        setAC2On(!AC2On);
        break;
      default:
        break;
    }
  };

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

  const resetAll = () => {
    setIsOn(false)
    setFan1On(false)
    setFan2On(false)
    setFan3On(false)
    setACOn(false)
    setAC2On(false)
    setSubmitting(false)
  }

  const getComponentsStatus = async () => {
    try {

      const data = await dmt3API.getComponentsStatusAPI();
      setACOn(data.ac1)
      setAC2On(data.ac2)
      setFan1On(data.efan)
      setFan2On(data.efan)
      setFan3On(data.efan)
    } catch (err) {
      console.log(err);
      resetAll()
    }
  }

  useFocusEffect(
    useCallback(() => {
      getComponentsStatus()
    }, [])
  )


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>DMT Room 3</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Menu pressed')}>
            <MaterialCommunityIcons name="dots-vertical" size={30} color="#9eaab8" />
          </TouchableOpacity>
        </View>

        <Menu />

        {/* Circular Display */}
        <CircleContainer />

        <Animated.View
          style={[styles.appliancesContainer, { transform: [{ translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.pullBar} />
          <View style={styles.backgroundWrapper}>
            {/* Fan 1 */}
            <View style={styles.contentCard}>
              <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
              <View style={styles.textContainer}>
                <Text style={styles.contentCardText}>Fan</Text>
                <Text style={[styles.contentCardStatus, { color: fan1On ? 'green' : 'red' }]}>
                  {fan1On ? 'On' : 'Off'}
                </Text>
              </View>
              <View style={styles.cardbuttonContainer}>
                <TouchableOpacity
                  style={[styles.powerButton, { backgroundColor: fan1On ? '#4CAF50' : '#FF5252' }]}
                  onPress={() => toggleFanPower(1)}
                >
                  <MaterialCommunityIcons
                    name={fan1On ? 'power' : 'power-on'}
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => handleReport('Fan', fan1On ? 'Active' : 'Inactive', setSubmitting)}
                >
                  <Text style={styles.reportButtonText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Fan 2 */}
            <View style={styles.contentCard}>
              <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
              <View style={styles.textContainer}>
                <Text style={styles.contentCardText}>Fan 2</Text>
                <Text style={[styles.contentCardStatus, { color: fan2On ? 'green' : 'red' }]}>
                  {fan2On ? 'On' : 'Off'}
                </Text>
              </View>
              <View style={styles.cardbuttonContainer}>
                <TouchableOpacity
                  style={[styles.powerButton, { backgroundColor: fan2On ? '#4CAF50' : '#FF5252' }]}
                  onPress={() => toggleFanPower(2)}
                >
                  <MaterialCommunityIcons
                    name={fan2On ? 'power' : 'power-on'}
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => handleReport('Fan 2', fan2On ? 'Active' : 'Inactive', setSubmitting)}
                >
                  <Text style={styles.reportButtonText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Fan 3 */}
            <View style={styles.contentCard}>
              <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
              <View style={styles.textContainer}>
                <Text style={styles.contentCardText}>Fan 3</Text>
                <Text style={[styles.contentCardStatus, { color: fan3On ? 'green' : 'red' }]}>
                  {fan3On ? 'On' : 'Off'}
                </Text>
              </View>
              <View style={styles.cardbuttonContainer}>
                <TouchableOpacity
                  style={[styles.powerButton, { backgroundColor: fan3On ? '#4CAF50' : '#FF5252' }]}
                  onPress={() => toggleFanPower(3)}
                >
                  <MaterialCommunityIcons
                    name={fan3On ? 'power' : 'power-on'}
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => handleReport('Fan 3', fan3On ? 'Active' : 'Inactive', setSubmitting)}
                >
                  <Text style={styles.reportButtonText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Aircon */}
            <View style={styles.contentCard}>
              <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
              <View style={styles.textContainer}>
                <Text style={styles.contentCardText}>Aircon</Text>
                <Text style={[styles.contentCardStatus, { color: ACOn ? 'green' : 'red' }]}>
                  {ACOn ? 'On' : 'Off'}
                </Text>
              </View>
              <View style={styles.cardbuttonContainer}>
                <TouchableOpacity
                  style={[styles.powerButton, { backgroundColor: ACOn ? '#4CAF50' : '#FF5252' }]}
                  onPress={() => toggleFanPower(4)}
                >
                  <MaterialCommunityIcons
                    name={ACOn ? 'power' : 'power-on'}
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => handleReport('Aircon', ACOn ? 'Active' : 'Inactive', setSubmitting)}
                >
                  <Text style={styles.reportButtonText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Aircon 2 */}
            <View style={styles.contentCard}>
              <MaterialCommunityIcons name="fan" size={30} color="#6C9AB2" style={styles.contentIconStyle} />
              <View style={styles.textContainer}>
                <Text style={styles.contentCardText}>Aircon 2</Text>
                <Text style={[styles.contentCardStatus, { color: AC2On ? 'green' : 'red' }]}>
                  {AC2On ? 'On' : 'Off'}
                </Text>
              </View>
              <View style={styles.cardbuttonContainer}>
                <TouchableOpacity
                  style={[styles.powerButton, { backgroundColor: AC2On ? '#4CAF50' : '#FF5252' }]}
                  onPress={() => toggleFanPower(5)}
                >
                  <MaterialCommunityIcons
                    name={AC2On ? 'power' : 'power-on'}
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => handleReport('Aircon 2', AC2On ? 'Active' : 'Inactive', setSubmitting)}
                >
                  <Text style={styles.reportButtonText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedf0',
  },
  scrollContainer: {
    flexGrow: 1, // Ensures the content stretches to fill the screen height
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the title
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9eaab8',
  },
  backButton: {
    padding: 10,
  },
  menuButton: {
    padding: 10,
    position: 'absolute',
    right: 20,
  },
  background: {
    backgroundColor: '#eaf2fd',
    flex: 1,
  },
  appliancesContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  pullBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  backgroundWrapper: {
    backgroundColor: '#fff', // White background
    padding: 20, // Padding to make the background larger
    borderRadius: 15, // Rounded corners
    alignItems: 'center', // Center the card horizontally
    justifyContent: 'center', // Center the card vertically
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 0, // Space around the wrapper
  },
  contentCard: {
    flexDirection: "row", // Align elements horizontally
    alignItems: "center", // Center items vertically
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10, // Space between cards if needed
    width: "100%", // Adjust width to make the card wider (90% of the parent container)
    alignSelf: "center", // Center the card horizontally
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
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'flex-end', // Push buttons to the far right
    alignItems: 'center', // Center buttons vertically
    marginLeft: 'auto', // Ensures alignment to the right
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
});
