import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import apiUtls from "../../common/apiUtls";
import { LEAVE_STATUS_ARRAY, LEAVE_TYPE_ARRAY } from "../../config/constants";
import style from "./style";
import { getDateString, MM_DD_YYYY, MM_DD_YYYY_HH_MM } from "../../common/datetimeUtls";
import AppLoader from "../../components/AppLoader";
import { showErrorNetwork, showLogout } from "../../common/commonFunc";

const LeaveTicketCard = ({ item, showLoader, getData }) => {
    const statusObj = LEAVE_STATUS_ARRAY[item.status];

    const onDeleteItem = async () => {
        showLoader(true);
        apiUtls.deleteLeaveTicket(item.leave_id).then(result => {
            if (result.failed || result === -1) {
                Alert.alert('Error', 'Some thing went wrong, please try later', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
            } else {
                Alert.alert('Information', 'Delete success', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
            }
        }).catch(error => {
            Alert.alert('Error', 'Some thing went wrong, please try later', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            console.log('Error -', error);
        }).finally(() => {
            getData().finally(() => {
                showLoader(false);
            })
        })
    }

    return (
        <View style={style.leaveRegisterContainer}>
            <View style={style.leaveTickerCard}>
                <View style={style.leaveTicketInfo}>
                    <View>
                        <Text style={style.leaveTickerTitle}>{LEAVE_TYPE_ARRAY[item.type]} APPLICATION</Text>
                        <Text>From: {getDateString(item.start_date, MM_DD_YYYY_HH_MM)}</Text>
                        <Text>To: {getDateString(item.end_date, MM_DD_YYYY_HH_MM)}</Text>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Text style={{ ...style.leaveTicketStatus, color: statusObj.color, backgroundColor: statusObj.background }}>{statusObj.text}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={style.leaveTickerRegistedText}>Registed at: {getDateString(item.create_at, MM_DD_YYYY)}</Text>
                    </View>
                </View>
                <View style={style.leaveTicketAction}>
                    {item.status === 0 && <TouchableOpacity onPress={() => onDeleteItem()}>
                        <Image source={require('../../assets/icons/delete.png')} style={{ width: 30, height: 30, tintColor: 'red' }} />
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}

const LeaveTicketScreen = (props) => {
    const navigation = props.navigation;
    const [isLoading, setIsLoading] = useState([]);
    const [data, setData] = useState([]);

    const getData = async () => {
        setIsLoading(true);
        apiUtls.getMyLeaveTicket().then(result => {
            if (result.failed) {
                showErrorNetwork();
            } else if (result == -1) {
                showLogout();
            } else {
                setData(result.reverse());
            }
        }).catch(error => {
            Alert.alert('Error', 'Some thing went wrong, please try later', [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            console.log('Error -', error);
        }).finally(() => {
            setIsLoading(false);
        })
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <LeaveTicketCard item={item} showLoader={setIsLoading} getData={getData} />
                    )
                }} />
            {isLoading && <AppLoader />}
        </View>

    )
}

export default LeaveTicketScreen;