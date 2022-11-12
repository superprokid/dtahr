import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, ScrollView } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from "../../components/DropDown";
import PrimaryButton from "../../components/PrimaryButton";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PrimaryInput from "../../components/PrimaryInput";
import styles from "./style";

const OverTimeRegisterScreen = (props) => {
    const navigation = props.navigation;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('on focus', 'LEAVE_REGISTER_TAB')
        });

        return unsubscribe;
    }, [navigation]);


    const [type, setType] = useState(null);
    const [items, setItems] = useState([
        { label: 'OFF', value: 0 },
        { label: 'LATE', value: 1 }
    ]);



    const [dateStartPicker, setDateStartPicker] = useState(false);

    const [dateStart, setDateStart] = useState(new Date());

    const [timeStartPicker, setTimeStartPicker] = useState(false);

    const [timeStart, setTimeStart] = useState(new Date(Date.now()));


    const [dateEndPicker, setDateEndPicker] = useState(false);

    const [dateEnd, setDateEnd] = useState(new Date());

    const [timeEndPicker, setTimeEndPicker] = useState(false);

    const [timeEnd, setTimeEnd] = useState(new Date(Date.now()));



    function showDateStartPicker() {
        setDateStartPicker(true);
    };

    function showTimeStartPicker() {
        setTimeStartPicker(true);
    };

    function onDateStartSelected(event, value) {
        setDateStart(value);
        setDateStartPicker(false);
    };

    function onTimeStartSelected(event, value) {
        setTimeStart(value);
        setTimeStartPicker(false);
    };



    function showDateEndPicker() {
        setDateEndPicker(true);
    };

    function showTimeEndPicker() {
        setTimeEndPicker(true);
    };

    function onDateEndSelected(event, value) {
        setDateEnd(value);
        setDateEndPicker(false);
    };

    function onTimeEndSelected(event, value) {
        setTimeEnd(value);
        setTimeEndPicker(false);
    };


    return (
        <ScrollView>
            <View style={styles.leaveRegisterContainer}>
                <DropDown
                    label="Name's project"
                    required={true}
                    items={items}
                    value={type}
                    setValue={setType}
                    setItems={setItems}
                />

                <View style={styles.titleContainer}>
                    <Text style={{ color: '#154c79' }}>Start date :</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.textInTimes}>{dateStart.toDateString() + "  " + timeStart.toLocaleTimeString()}</Text>
                    {dateStartPicker && (
                        <DateTimePicker
                            value={dateStart}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onDateStartSelected}
                        />
                    )}
                    {timeStartPicker && (
                        <DateTimePicker
                            value={timeStart}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={false}
                            onChange={onTimeStartSelected}
                        />
                    )}
                    {!dateStartPicker && (
                        <View style={styles.containerBtnDate} >
                            <Pressable onPress={showDateStartPicker}>
                                <Text style={styles.textInBtnChange}>date</Text>
                            </Pressable>
                        </View>
                    )}
                    {!timeStartPicker && (
                        <View style={styles.containerBtnTime}>
                            <Pressable onPress={showTimeStartPicker}>
                                <Text style={styles.textInBtnChange}>time</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <View style={styles.titleContainer}>
                    <Text style={{ color: '#154c79' }}>End date :</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.textInTimes}>{dateEnd.toDateString() + "  " + timeEnd.toLocaleTimeString()}</Text>
                    {dateEndPicker && (
                        <DateTimePicker
                            value={dateEnd}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onDateEndSelected}
                        />
                    )}
                    {timeEndPicker && (
                        <DateTimePicker
                            value={timeEnd}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={false}
                            onChange={onTimeEndSelected}
                        />
                    )}
                    {!dateEndPicker && (
                        <View style={styles.containerBtnDate}>
                            <Pressable onPress={showDateEndPicker}>
                                <Text style={styles.textInBtnChange}>date</Text>
                            </Pressable>
                        </View>
                    )}
                    {!timeEndPicker && (
                        <View style={styles.containerBtnTime}>
                            <Pressable onPress={showTimeEndPicker}>
                                <Text style={styles.textInBtnChange}>time</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                <View style={styles.titleContainer}>
                    <Text style={{ color: '#154c79' }}>Reason :</Text>
                </View>

                <View >
                    <TextInput style={styles.textReason}
                        multiline
                    ></TextInput>
                </View>

                <View >

                    <PrimaryButton type="primary" title="Register"></PrimaryButton>
                </View>
            </View>
        </ScrollView>
    )
}

export default OverTimeRegisterScreen;