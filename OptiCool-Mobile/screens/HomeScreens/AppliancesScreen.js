import React from "react";
import { View, Text, Switch, StyleSheet, Image, Alert } from "react-native";
import dmt3API from "../../services/dmt3API";
import { ActivityIndicator } from "react-native-paper";

const AppliancesScreen = () => {
  const [isLightOn, setLightOn] = React.useState(false);
  const [isFanOn, setFanOn] = React.useState(false);
  const [isExhaustInwardsOn, setExhaustInwardsOn] = React.useState(false);
  const [isExhaustOutwardsOn, setExhaustOutwardsOn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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


  const resetAll = () => {
    setFanOn(false)
    setExhaustInwardsOn(false)
    setExhaustOutwardsOn(false)
    setLightOn(false)
  }

  const handleAC = async (status) => {
    setLoading(true)
    try {

      if (status) {
        await dmt3API.turnOnAllAC();
      } else {
        await dmt3API.turnOffAllAC();
      }

    } catch (err) {
      Alert.alert("No running system", "Not connected to the system")
      console.log(err);
      resetAll()
    }
    setLoading(false)
  }

  const handleFans = async (status) => {
    setLoading(true)
    try {
      if (status) {
        await dmt3API.turnOnEFans();
      } else {
        await dmt3API.turnOffEFans();
      }
    } catch (err) {
      Alert.alert("No running system", "Not connected to the system")
      console.log(err);
      resetAll()
    }
    setLoading(false)
  }

  const handleBlower = async (status) => {
    setLoading(true)
    try {
      if (status) {
        await dmt3API.turnOnBlower();
      } else {
        await dmt3API.turnOffBlower();
      }
    } catch (err) {
      Alert.alert("No running system", "Not connected to the system")
      console.log(err);
      resetAll()
    }
    setLoading(false)
  }

  const handleExhaust = async (status) => {
    setLoading(true)
    try {
      if (status) {
        await dmt3API.turnOnExhaust();
      } else {
        await dmt3API.turnOffExhaust();
      }
    } catch (err) {
      console.log(err);
      Alert.alert("No running system", "Not connected to the system")
      resetAll()
    }
    setLoading(false)
  }

  return (
    <View style={[styles.container]} pointerEvents={loading ? 'none' : 'auto'}>
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
              onValueChange={(value) => {
                setLightOn((prev) => !prev)
                handleAC(value)
              }}
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
              onValueChange={(value) => {
                setFanOn((prev) => !prev)
                handleFans(value);
              }}
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
              onValueChange={(value) => {
                setExhaustInwardsOn((prev) => !prev)
                handleBlower(value)
              }}
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
              onValueChange={(value) => {
                setExhaustOutwardsOn((prev) => !prev)
                handleExhaust(value)
              }}
              style={styles.switch}
            />
          </View>
        </View>
      </View>
      <View style={{
        position: 'absolute',
        top: '50%',
      }}>
        <ActivityIndicator animating={loading} size={'large'} />
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
