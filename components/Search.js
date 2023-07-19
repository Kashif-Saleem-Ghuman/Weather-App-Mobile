import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';

export default function Search({ cityName }) {
  const [text, setText] = useState('')

  const textHandler = (enteredText) => {
    setText(enteredText);
  }

  const sendCityName = () => {
    cityName(text)
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={textHandler}
        style={styles.searchBar}
        placeholder="Search..."
      />
      <EvilIcons style={styles.searchIcon} name="search" size={24} color="black" onPress={sendCityName} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    width: '100%',
  },
  searchIcon: {
    marginLeft: 10,
  },
});
