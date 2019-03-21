import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { weatherConditions } from "../utils/WeatherConditions";

const Weather = ({ weather, temperature, city }) => {
  if (weather && weatherConditions && weatherConditions[weather]) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color }
        ]}
      >
        <Text style={styles.city}>{city}</Text>
        <MaterialCommunityIcons
          style={styles.icon}
          size={48}
          name={weatherConditions[weather].icon}
          color={"#fff"}
        />
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>

        <Text style={styles.tempText}>{temperature}°</Text>
      </View>
    );
  }
  return null;
};
//runtime type checking for React props and similar objects
Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    width: 375,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },

  city: {
    marginTop: 30,
    fontSize: 30,
    color: "#fff"
  },
  title: {
    fontSize: 48,
    color: "#fff"
  },
  icon: {
    fontSize: 200
  },
  tempText: {
    fontSize: 48,
    color: "#fff"
  }
});

export default Weather;
