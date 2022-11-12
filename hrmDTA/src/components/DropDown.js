import React, { useState } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Styles from "../view/main-style";

import DropDownPicker from 'react-native-dropdown-picker'

const screenWidth = Dimensions.get('window').width;
const InputWidth = screenWidth * 0.85;

// props: label (string), placeholder (string), onChangeText (function), required (boolen), isPassword (boolen)
function DropDown(props) {

    let textLabel = props.label
    if (props.required) {
        textLabel = textLabel.concat('*')
    }


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    return (
        <View style={{ flexDirection: 'column' }}>
            <Text style={Styles.input_label}>{textLabel}</Text>
            <DropDownPicker
                style={Styles.dropdown}
                open={open}
                value={props.value}
                items={props.items}
                setOpen={setOpen}
                listMode='SCROLLVIEW'
                setValue={props.setValue}
                setItems={props.setItems}
                containerStyle={Styles.dropdown_container}
            />
        </View>
    )
}

export default DropDown;