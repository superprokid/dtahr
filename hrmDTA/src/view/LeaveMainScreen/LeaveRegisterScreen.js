import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import DropDown from "../../components/DropDown";
import PrimaryButton from "../../components/PrimaryButton";
import styles from "./style";
import mainStyle from "../main-style";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDateString, getTimeString, HH_MM, MM_DD_YYYY, YYYY_MM_DD } from "../../common/datetimeUtls";
import AppLoader from "../../components/AppLoader";
import apiUtls from "../../common/apiUtls";

const LeaveRegisterScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState(null);
    const [items, setItems] = useState([
        { label: 'OFF', value: 0 },
        { label: 'LATE', value: 1 }
    ]);

    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [date, setDate] = useState('');
    const onChangeDate = (event, selectedTime) => {
        if (selectedTime === undefined) {
            onCancelDate();
            return;
        }
        setDate(new Date(selectedTime));
        onCancelDate();
    }

    const [isShowTimeFromPicker, setIsShowTimeFromPicker] = useState(false);
    const [timeFrom, setTimeFrom] = useState('');
    const onChangeTimeFrom = (event, selectedTime) => {
        if (selectedTime === undefined) {
            onCancelTimeFrom()
            return;
        }
        setTimeFrom(new Date(selectedTime));
        onCancelTimeFrom();
    }

    const [isShowTimeToPicker, setIsShowTimeToPicker] = useState(false);
    const [timeTo, setTimeTo] = useState('');
    const onChangeTimeTo = (event, selectedTime) => {
        if (selectedTime === undefined) {
            onCancelTimeTo()
            return;
        }
        setTimeTo(new Date(selectedTime));
        onCancelTimeTo();
    }

    const onCancelDate = () => {
        setIsShowDatePicker(false);
    }

    const onCancelTimeFrom = () => {
        setIsShowTimeFromPicker(false);
    }

    const onCancelTimeTo = () => {
        setIsShowTimeToPicker(false);
    }

    const [reason, setReason] = useState('');

    const onRegister = async () => {
        if (type == null || !date || !timeFrom || !timeTo || !reason) {
            Alert.alert('Error', 'Please fill all field', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            return;
        }
        setIsLoading(true);
        apiUtls.registerLeaveTicket({
            type: type,
            startDate: `${getDateString(date, YYYY_MM_DD)} ${getTimeString(timeFrom)}`,
            endDate: `${getDateString(date, YYYY_MM_DD)} ${getTimeString(timeTo)}`,
            reason: reason
        }).then(result => {
            setIsLoading(false);
            if (result.failed || result === -1) {
                Alert.alert('Error', 'Some thing went wrong, please try later', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
            } else {
                Alert.alert('Information', 'Register success', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
                onClearData();
            }
        }).catch(error => {
            setIsLoading(false);
            Alert.alert('Error', 'Some thing went wrong, please try later', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            console.log('Error -', error);
        });
    }

    const onClearData = () => {
        setDate('');
        setTimeFrom('');
        setTimeTo('');
        setReason('');
        setType(null);
    }

    return (
        <ScrollView>
            <View style={styles.leaveRegisterContainer}>
                <DropDown
                    label='Leave Type'
                    required={true}
                    items={items}
                    value={type}
                    setValue={setType}
                    setItems={setItems} />

                <View style={{ width: '85%', }}><Text style={mainStyle.input_label}>Date*</Text></View>
                <TouchableOpacity
                    onPress={() => { setIsShowDatePicker(true) }}>
                    <TextInput style={mainStyle.primary_input}
                        placeholderTextColor='gray'
                        autoCapitalize='none'
                        placeholder="dd/mm/yyyy"
                        editable={false}
                        value={date ? getDateString(date, MM_DD_YYYY) : ''}
                    ></TextInput>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '85%' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={mainStyle.input_label}>From*</Text>
                        <TouchableOpacity onPress={() => setIsShowTimeFromPicker(true)}>
                            <TextInput placeholder="hh:mm" style={mainStyle.weight_input} editable={false} value={timeFrom ? getTimeString(timeFrom) : ''}></TextInput>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={mainStyle.input_label}>To*</Text>
                        <TouchableOpacity onPress={() => setIsShowTimeToPicker(true)}>
                            <TextInput placeholder="hh:mm" style={mainStyle.weight_input} editable={false} value={timeTo ? getTimeString(timeTo) : ''}></TextInput>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '85%', }}><Text style={mainStyle.input_label}>Reason*</Text></View>
                <TextInput style={{ ...mainStyle.primary_input, height: 100, marginBottom: 30, textAlignVertical: "top" }}
                    multiline={true}
                    placeholderTextColor='gray'
                    autoCapitalize='none'
                    onChangeText={(text) => setReason(text)}
                    value={reason}
                ></TextInput>
                <PrimaryButton type='primary' title='Register' onPress={onRegister} />
                {isShowDatePicker && <DateTimePicker
                    value={date || new Date()}
                    mode={'date'}
                    display="default"
                    onChange={onChangeDate}
                    onTouchCancel={onCancelDate}
                    minimumDate={new Date()} />}
                {isShowTimeFromPicker && <DateTimePicker
                    value={timeFrom || new Date()}
                    mode={'time'}
                    display="default"
                    is24Hour={true}
                    onChange={onChangeTimeFrom}
                    onTouchCancel={onCancelTimeFrom} />}
                {isShowTimeToPicker && <DateTimePicker
                    value={timeTo || new Date()}
                    mode={'time'}
                    display="default"
                    is24Hour={true}
                    onChange={onChangeTimeTo}
                    onTouchCancel={onCancelTimeTo} />}
                {isLoading && <AppLoader />}
            </View>
        </ScrollView>
    )
}

export default LeaveRegisterScreen;