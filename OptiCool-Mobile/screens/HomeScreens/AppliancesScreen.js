import React from "react";
import { View, Text, Switch, StyleSheet, Image } from "react-native";

const AppliancesScreen = () => {
  const [isLightOn, setLightOn] = React.useState(false);
  const [isAC1On, setAC1On] = React.useState(false);
  const [isTVOn, setTVOn] = React.useState(false);
  const [isAC2On, setAC2On] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.card, isLightOn && styles.activeCard]}>
          <Image
            source={require("../../assets/air-conditioner.png")} // Add your image path here
            style={styles.cardImage}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.cardText, isLightOn && styles.activeText]}>
              Smart{"\n"}Light
            </Text>
            <Switch
              value={isLightOn}
              onValueChange={() => setLightOn((prev) => !prev)}
            />
          </View>
        </View>

        <View style={[styles.card, isLightOn && styles.activeCard]}>
          <Image
            source={require("../../assets/fan.png")} // Add your image path here
            style={styles.cardImage}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.cardText, isLightOn && styles.activeText]}>
              Fan
            </Text>
            <Switch
              value={isLightOn}
              onValueChange={() => setLightOn((prev) => !prev)}
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, isLightOn && styles.activeCard]}>
          <Image
            source={require("../../assets/light-bulb.png")} // Add your image path here
            style={styles.cardImage}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.cardText, isLightOn && styles.activeText]}>
              Light{"\n"}Bulb
            </Text>
            <Switch
              value={isLightOn}
              onValueChange={() => setLightOn((prev) => !prev)}
            />
          </View>
        </View>

        <View style={[styles.card, isLightOn && styles.activeCard]}>
          <Image
            source={require("../../assets/light-bulb.png")} // Add your image path here
            style={styles.cardImage}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.cardText, isLightOn && styles.activeText]}>
              Smart{"\n"}TV
            </Text>
            <Switch
              value={isLightOn}
              onValueChange={() => setLightOn((prev) => !prev)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebedf0",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    width: "45%",
    height: 180, // Set a fixed height for the card
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center", // Centers children horizontally (for 'row' direction)
    margin: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  activeCard: {
    backgroundColor: "#000",
  },
  cardText: {
    fontSize: 16,
    color: "#000",
    marginTop: 20,
    marginBottom: 5,
    marginRight: 15,
  },
  activeText: {
    color: "#fff",
  },
});

export default AppliancesScreen;
