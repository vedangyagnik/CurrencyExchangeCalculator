import React, { useState, useEffect} from 'react';
import {View, Picker, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';

const CurrencyConverter = (props) => {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 10,
          backgroundColor: "#eaeaea",
          marginBottom: 10,
          width: (Platform.OS == "web") ? "50%" : "95%"
        },
        
        flexContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10

        },
        textInput: {
            textAlign: "right",
            height: 50,
            width: 100,
        },
        heading:{
            textAlign: "center",
            fontSize: 12
        },
        swapBtn: {
            backgroundColor: "green",
            padding:10,
            borderWidth:2,
            borderColor: "black",
            borderRadius: 5,
        },
        swapText: {
            color: "white"
        },convertedText:{
            lineHeight: 40,
            color: "green"
        },
        picker: {
            padding: 5,
            height: 50,
            width: 100,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "grey",
            color: "grey"
        }
      });
    const [apiUnitResponse, setApiUnitResponse] = useState({});
    const [fromUnit, setFromUnit] = useState("CAD");
    const [toUnit, setToUnit] = useState("CAD");
    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState('1');

    useEffect(() => {
        fetchDataFromAPI();
      }, [toValue, fromValue, toUnit, fromUnit]);
      

    const calToValue = (newValue = undefined, newAPIUnit = undefined, newToUnit = undefined) => {
        let fromVal = newValue == undefined ? fromValue : newValue;
        let apiUnitVal = newAPIUnit == undefined ? apiUnitResponse  : newAPIUnit;
        let toUnitVal = newToUnit == undefined ? toUnit : newToUnit;
        setToValue(((fromVal * apiUnitVal[toUnitVal]).toFixed(2)).toString());
    }

    const fetchDataFromAPI = () => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromUnit}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setApiUnitResponse(data.rates);
            calToValue(undefined, data.rates);
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Choose the currency and the amounts to get the exchange rate</Text>
            <View style={styles.flexContainer}>
            <Picker
                style={styles.picker}
                selectedValue={fromUnit}
                onValueChange={(itemValue, itemIndex) => {
                    setFromUnit(itemValue);
                    fetchDataFromAPI();
                    // calToValue();
                }}
            >
                <Picker.Item label="CAD" value="CAD" />
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="GBP" value="GBP" />
            </Picker>
            <TextInput
                style= {styles.textInput}
                onChangeText={text => {
                    setFromValue(text);
                    calToValue(parseInt(text))
                    
                }}
                value={fromValue}
                keyboardType={'numeric'}
            />
            </View>
            <View style={styles.flexContainer}>
            <TouchableOpacity 
                style={styles.swapBtn}
                onPress={()=>{
                let tempFromUnit = fromUnit;
                setFromUnit(toUnit);
                setToUnit(tempFromUnit);
                fetchDataFromAPI();
            }}>
                <Text style={styles.swapText}>Swap</Text>
            </TouchableOpacity>
            <Text style={styles.convertedText}>1 {fromUnit} = {apiUnitResponse[toUnit]} {toUnit}</Text>
            </View>
            <View style={styles.flexContainer}>
            <Picker
            style={styles.picker}
                selectedValue={toUnit}
                onValueChange={(itemValue, itemIndex) => {
                    setToUnit(itemValue);
                    calToValue(undefined, undefined, itemValue);
                }}
            >
                <Picker.Item label="CAD" value="CAD" />
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="GBP" value="GBP" />
            </Picker>
            <Text>{toValue ? toValue : '0'}</Text>
            </View>
        </View>
    );
}

export default CurrencyConverter;