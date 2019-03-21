import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Weather from "./components/Weather";
import { weatherConditions } from "./utils/WeatherConditions";

import { API_KEY } from "./utils/WeatherAPIKeys";

export default class App extends React.Component {
  state = {
    city: null,
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
    zipCode: null
  };

  componentDidMount() {
    //getCurrentPosition requires callback
    navigator.geolocation.getCurrentPosition(
      //position is an object received from getCurrentPosition
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "fetch error"
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          city: json.name,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchWeatherZip(zipCode) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          city: json.name,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onZipCodeChange = zipCode => {
    this.setState({ zipCode });
  };

  onSubmission = () => {
    this.fetchWeatherZip(this.state.zipCode);
  };

  render() {
    //destructured props
    const { isLoading, weatherCondition, temperature, city } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <Weather
              weather={weatherCondition}
              temperature={temperature}
              city={city}
            />
            <View style={styles.textInput}>
              <TextInput
                style={styles.typing}
                placeholder="enter zip code"
                value={this.state.zipCode}
                onChangeText={this.onZipCodeChange}
              />
              <Button title="submit" onPress={this.onSubmission} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    height: 90,
    padding: 10,
    marginBottom: 40
  },
  typing: {
    margin: 15,
    textAlign: "center",
    fontSize: 24
  }
});
