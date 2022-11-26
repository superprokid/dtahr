import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, ScrollView, TouchableOpacity } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from "../../components/DropDown";
import PrimaryButton from "../../components/PrimaryButton";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PrimaryInput from "../../components/PrimaryInput";
import styles from "./style";
import apiUtls from "../../common/apiUtls";
import { showErrorNetwork } from "../../common/commonFunc";
import { getDateString, DD_MMM_YYYY_HH_MM } from "../../common/datetimeUtls";

const OverTimeRegisterScreen = (props) => {
    const navigation = props.navigation;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('on focus', 'LEAVE_REGISTER_TAB')
        });

        return unsubscribe;
    }, [navigation]);

    const [projectId, setProjectId] = useState(null);

    const [isShowStartDatePicker, setShowStartDatePicker] = useState(false);
    const [isShowEndDatePicker, setShowEndDatePicker] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [listProject, setListProject] = useState([])

    function showEndDatePicker() {
        setShowEndDatePicker(true);
    };

    function showStartDatePicker() {
        setShowStartDatePicker(true);
    };

    function onRegisterOT() {
        // const params = {
        //     projectId,
        //     startDate: 
        // }
    }

    async function getProject() {
        const result = await apiUtls.getAllProject();
        if (result.failed || result === -1) {
            showErrorNetwork();
            return;
        }
        else {
            const listProject = result?.map((item) => {
                return { label: item.project_name, value: item.project_id }
            })
            setListProject(listProject);
        }
    }

    useEffect(() => {
        (async () => {
            await getProject();
        })()
    })

    return (
        <ScrollView>
            <View style={styles.leaveRegisterContainer}>
                <DropDown
                    label="Name's project"
                    required={true}
                    items={listProject}
                    value={projectId}
                    setValue={setProjectId}
                    setItems={setListProject}
                />

                <View style={styles.titleContainer}>
                    <Text style={{ color: '#154c79' }}>Start date :</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text>{getDateString(startDate, DD_MMM_YYYY_HH_MM)}</Text>
                    
                    <TouchableOpacity style={styles.buttonChangeContainer}><Text style={styles.textChange}>Change</Text></TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={{ color: '#154c79' }}>End date :</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text>{getDateString(endDate, DD_MMM_YYYY_HH_MM)}</Text>
                    
                    <TouchableOpacity style={styles.buttonChangeContainer}><Text style={styles.textChange}>Change</Text></TouchableOpacity>
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
                    <PrimaryButton type="primary" title="Register" onPress={() => { onRegisterOT() }}></PrimaryButton>
                </View>

                {isShowStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode={'datetime'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                    // onChange={onDateStartSelected}
                    />
                )}
                {isShowEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode={'datetime'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={false}
                    // onChange={onTimeStartSelected}
                    />
                )}
            </View>
        </ScrollView>
    )
}

export default OverTimeRegisterScreen;