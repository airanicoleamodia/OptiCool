import React from "react";
import { View, Text, Switch, StyleSheet, Image } from "react-native";

const AppliancesScreen = () => {
  const [isLightOn, setLightOn] = React.useState(false);
  const [isFanOn, setFanOn] = React.useState(false);
  const [isExhaustInwardsOn, setExhaustInwardsOn] = React.useState(false);
  const [isExhaustOutwardsOn, setExhaustOutwardsOn] = React.useState(false);

  const getCardStyle = (isOn) => ({
    ...styles.card,
    backgroundColor: isOn ? "#000" : "#fff",
  });

  const getTextStyle = (isOn) => ({
    ...styles.cardText,
    color: isOn ? "#fff" : "#000",
  });

  const getSmallTextStyle = (isOn) => ({
    ...styles.smallCardText,
    color: isOn ? "#fff" : "#000",
  });

  const getImageStyle = (isOn) => ({
    ...styles.cardImage,
    tintColor: isOn ? "#fff" : "#000",
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={getCardStyle(isLightOn)}>
          <Image
            source={require("../../assets/air-conditioner.png")} // Add your image path here
            style={getImageStyle(isLightOn)}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={getTextStyle(isLightOn)}>Aircon</Text>
            <Switch
              value={isLightOn}
              onValueChange={() => setLightOn((prev) => !prev)}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={getCardStyle(isFanOn)}>
          <Image
            source={require("../../assets/fan.png")} // Add your image path here
            style={getImageStyle(isFanOn)}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={getTextStyle(isFanOn)}>Fan</Text>
            <Switch
              value={isFanOn}
              onValueChange={() => setFanOn((prev) => !prev)}
              style={styles.switch}
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={getCardStyle(isExhaustInwardsOn)}>
          <Image
            source={require("../../assets/light-bulb.png")} // Add your image path here
            style={getImageStyle(isExhaustInwardsOn)}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[getSmallTextStyle(isExhaustInwardsOn), { marginLeft: 10 }]}>
              Exhaust{"\n"}(Inwards)
            </Text>
            <Switch
              value={isExhaustInwardsOn}
              onValueChange={() => setExhaustInwardsOn((prev) => !prev)}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={getCardStyle(isExhaustOutwardsOn)}>
          <Image
            source={require("../../assets/light-bulb.png")} // Add your image path here
            style={getImageStyle(isExhaustOutwardsOn)}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[getSmallTextStyle(isExhaustOutwardsOn), { marginLeft: 10 }]}>
              Exhaust{"\n"}(Outwards)
            </Text>
            <Switch
              value={isExhaustOutwardsOn}
              onValueChange={() => setExhaustOutwardsOn((prev) => !prev)}
              style={styles.switch}
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
  cardText: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
  },
  smallCardText: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
  },
  switch: {
    transform: [{ rotate: "90deg" }],
    marginLeft: 8,
  },
});

export default AppliancesScreen;
