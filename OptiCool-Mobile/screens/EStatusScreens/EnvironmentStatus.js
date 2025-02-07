import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, Animated, PanResponder } from 'react-native';
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
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>DMT Room 3</Text>
        {/* <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Menu pressed')}>
          <MaterialCommunityIcons name="dots-vertical" size={30} color="#9eaab8" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.menuWrapper}>
        <Menu/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedf0',
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
  menuWrapper: {
    flex: 1,
    marginTop: 370, // Adjust the margin as needed
  },
});
