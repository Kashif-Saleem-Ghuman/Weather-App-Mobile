import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from '../assets/background/index.js';
import { API_KEY, BASE_URL } from '@env'

export default function Weather({ cityNameNew, backgroundimg }) {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [getIcon, setIcon] = useState('');
  const [background, setBackground] = useState('');
  // MAKE API CALL

  const fetchWeatherData = async (cityName) => {
    setLoading(true)
    const API = `${BASE_URL}=${cityName}&appid=${API_KEY}`

    let res = await fetch(API);
    if (res.status == 200) {
      let data = await res.json();
      setWeatherData(data);
    }

    else {
      setWeatherData(null)

    }
    setLoading(false)
  }
  useEffect(() => {
    fetchWeatherData(cityNameNew)

    const iconObj = {
      cloud: <Ionicons name="ios-cloud-sharp" size={24} color="black" />,

      clear: <Feather name="sun" size={24} color="black" />,

      rain: <FontAwesome5 name="cloud-rain" size={24} color="black" />,

      haze: <Fontisto name="day-haze" size={24} color="black" />,

      snow: <MaterialCommunityIcons name="snowflake" size={24} color="black" />,

    }

    if (weatherData != null) {

      const now = new Date();
      console.log(now)
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const sunset = new Date(weatherData.sys.sunset * 1000);
      const isDayTime = now > sunrise && now < sunset;


      switch (weatherData.weather[0].main) {
        case "Haze":
          setIcon(iconObj.haze)
          isDayTime ? setBackground(haze_day) : setBackground(haze_night)
          break;
        case "Snow":
          setIcon(iconObj.snow)
          isDayTime ? setBackground(snow_day) : setBackground(snow_night)
          break;
        case "Rain":
        case "Drizzle":
          setIcon(iconObj.rain)
          isDayTime ? setBackground(rain_day) : setBackground(rain_night)
          break;
        case "Clear":
          setIcon(iconObj.clear)
          isDayTime ? setBackground(clear_day) : setBackground(clear_night)
          break;
        case "Clouds":
          setIcon(iconObj.cloud)
          isDayTime ? setBackground(cloud_day) : setBackground(cloud_night)
          break;

        default:
          setIcon(iconObj.clear)
          break;
      }
      // sending background as a prop 
      backgroundimg(background)
    }
  }, [cityNameNew])

  if (loading) {
    return (
      <ActivityIndicator style='large' />
    )
  }
  else if (weatherData == null) {
    return (
      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10, color: 'red' }}>Please enter city name</Text>
    )

  }
  else {

    return (

      <View style={styles.wrapperWeather}>
        <View>
          <Text style={styles.textWeather}>{weatherData.name}</Text>
          <Text style={styles.textDesc}>{weatherData.weather[0].description}</Text>
          <Text>{getIcon}</Text>
          <Text style={styles.textWDeg}>{Math.round((weatherData.main.temp) - 273.15)}°</Text>
          <View style={styles.wrapperHiLow}>
            <Text style={styles.textHi}>Hi: {Math.round((weatherData.main.temp_max) - 273.15)}°</Text>
            <Text style={styles.textLow}>Low: {Math.round((weatherData.main.temp_min) - 273.15)}°</Text>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapperWeather: {
    gap: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  wrapperHiLow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  textWeather: {
    fontSize: 30,
    fontWeight: '500'
  },
  textDesc: {
    fontSize: 15,
  },
  textWDeg: {
    fontSize: 60,
    fontWeight: '300',
  }
})