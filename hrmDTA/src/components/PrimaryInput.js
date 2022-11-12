import React from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Styles from "../view/main-style";

const screenWidth = Dimensions.get('window').width;
const InputWidth = screenWidth * 0.85;

// props: label (string), placeholder (string), onChangeText (function), required (boolen), isPassword (boolen)
function PrimaryInput(props)  {

    let textLabel = props.label
    if (props.required && textLabel) {
        textLabel = textLabel.concat('*')
    }
    const editable = props.editable ==  false ? false : true;

    return (
        <View style = {{flexDirection: 'column'}}>
            {console.log(props.value)}
            <Text style = {Styles.input_label}>{textLabel}</Text>
            <TextInput style = {Styles.primary_input}
                placeholder = {props.placeholder}
                placeholderTextColor = 'gray'
                autoCapitalize='none'
                onChangeText = {props.onChangeText}
                secureTextEntry = {props.isPassword}
                editable = {editable}
                value = {props.value}></TextInput>
        </View>
    )
}

export default PrimaryInput;