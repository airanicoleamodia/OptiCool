import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const CircleContainer = () => {
  return (
    <View style={styles.circleContainer}>
      {/* Outer Circle */}
      <View style={styles.outerCircle}>
        {/* Timer Lines */}
        {[...Array(60)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.timerLine,
              { transform: [{ rotate: `${index * 6}deg` }] },
            ]}
          />
        ))}
        {/* Inner Circle */}
        <View style={styles.innerCircle}>
          <Text style={styles.coolingText}>COOLING</Text>
          <Text style={styles.temperatureText}>28°</Text>
          <Text style={styles.snowflakeIcon}>❄</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        {/* Ceiling Fan Card */}
        <View style={styles.statusCard}>
          <MaterialCommunityIcons
            name="fan"
            size={30}
            color="#6C9AB2"
            style={styles.iconStyle}
          />
          <View>
            <Text style={styles.statusCardText}>Ceiling Fan</Text>
            <Text style={styles.statusCardStatus}>Active</Text>
          </View>
        </View>

        {/* Exhaust Fan Card */}
        <View style={styles.statusCard}>
          <MaterialCommunityIcons
            name="fan"
            size={30}
            color="#6C9AB2"
            style={styles.iconStyle}
          />
          <View>
            <Text style={styles.statusCardText}>Exhaust</Text>
            <Text style={styles.statusCardStatus}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#EAF6FF',
    borderWidth: 30,
    borderColor: '#96a8fa',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerLine: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#96a8fa',
    top: 0,
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5FAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coolingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#9eaab8',
    marginTop: 15,
    marginBottom: -5,
  },
  temperatureText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4f5e70',
    marginVertical: 5,
  },
  snowflakeIcon: {
    fontSize: 20,
    color: '#6C9AB2',
    marginTop: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add space between cards
    marginHorizontal: 20, // Add padding on the sides
    marginTop: 20,
  },
  statusCard: {
    flexDirection: "row", // Align elements horizontally
    alignItems: "center", // Center items vertically
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10, // Add space between the cards
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
    marginRight: 10
  },
  statusCardStatus: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default CircleContainer;
