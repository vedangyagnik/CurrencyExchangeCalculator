import React from 'react';
import {SafeAreaView, Text, Image, StyleSheet} from 'react-native';
import CurrencyConverter from './CurrencyConverter';

const App = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      alignItems: "center",
      backgroundColor: "#eaeaea",
      marginBottom: 10,
      
    },
    title: {
      marginTop: 10,
      color: "green",
      fontSize: 20,
      fontWeight: "bold"
    },
    image:{
      height: 150,
      width: 250,
    }
  });

  return (
    <SafeAreaView style = {styles.container}>
      <Image source={require("./assets/dollar_golden.png")} resizeMode="center" style = {styles.image}/>
      <Text style={styles.title}>MADS Lab Test 2 Exhchange Calculator</Text>
      <CurrencyConverter/>
    </SafeAreaView>
  );
}

export default App;