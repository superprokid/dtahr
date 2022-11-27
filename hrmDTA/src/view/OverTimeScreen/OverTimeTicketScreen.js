import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import apiUtls from "../../common/apiUtls";
import { LEAVE_STATUS_ARRAY, LEAVE_TYPE_ARRAY } from "../../config/constants";
import style from "./style";
import { getDateString, MM_DD_YYYY, MM_DD_YYYY_HH_MM } from "../../common/datetimeUtls";
import AppLoader from "../../components/AppLoader";
import { getVNDCurrency, showErrorNetwork, showLogout } from "../../common/commonFunc";

const OverTimeTicketCard = ({ item, showLoader, getData }) => {
    const statusObj = LEAVE_STATUS_ARRAY[item.status];

    const onDeleteItem = async () => {
        showLoader(true);
        apiUtls.deleteOverTimeTicket(item.leave_id).then(result => {
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
        <View style={style.otRegisterContainer}>
            <View style={style.otTickerCard}>
                <View style={style.otTicketInfo}>
                    <View>
                        <Text style={style.otTickerTitle}>{item.project_name}</Text>
                        <Text>From: {getDateString(item.start_date, MM_DD_YYYY_HH_MM)}</Text>
                        <Text>To: {getDateString(item.end_date, MM_DD_YYYY_HH_MM)}</Text>
                        <View style={{ alignSelf: 'flex-start' }}>
                            <Text style={{ ...style.otTicketStatus, color: statusObj.color, backgroundColor: statusObj.background }}>{statusObj.text}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={style.otTickerRegistedText}>Registed at: {getDateString(item.create_at, MM_DD_YYYY)}</Text>
                    </View>
                </View>
                <View style={style.otTicketAction}>
                    <Text style={style.otPaymentText}>{getVNDCurrency(item.payment)}</Text>
                    {item.status === 0 && <TouchableOpacity onPress={() => onDeleteItem()} style={{marginEnd: 10}}>
                        <Image source={require('../../assets/icons/delete.png')} style={{ width: 25, height: 25, tintColor: 'red' }} />
                    </TouchableOpacity>}
                    {item.status !== 0 && <View></View>}
                </View>
            </View>
        </View>
    )
}

const OvertimeTicketScreen = (props) => {
    const navigation = props.navigation;
    const [isLoading, setIsLoading] = useState([]);
    const [data, setData] = useState([]);

    const getData = async () => {
        setIsLoading(true);
        apiUtls.getMyOverTimeTicket().then(result => {
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
                        <OverTimeTicketCard item={item} showLoader={setIsLoading} getData={getData} />
                    )
                }} />
            {isLoading && <AppLoader />}
        </View>

    )
}

export default OvertimeTicketScreen;