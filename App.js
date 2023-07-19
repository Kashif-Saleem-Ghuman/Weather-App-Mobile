import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';


export default function App() {
  const [name, setName] = useState('')
  const [background, setBackground] = useState('')

  const cityHandler = (val) => {
    setName(val)
  }


  const backgroundHandler = (bg) => setBackground(bg)


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.container} source={background} resizeMode='cover'>
        <Search cityName={cityHandler} />
        <Weather cityNameNew={name} backgroundimg={backgroundHandler} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
  },
});
