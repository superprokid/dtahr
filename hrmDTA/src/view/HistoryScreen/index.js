import { useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Timeline from 'react-native-timeline-flatlist'
import apiUtls from "../../common/apiUtls"
import { groupArrayByKey } from "../../common/commonFunc"
import { getDateString, getStartAndEndOfMonth, HH_MM, MMM_YYYY, MM_DD_YYYY } from "../../common/datetimeUtls"
import style from "./style"
import AppLoader from "../../components/AppLoader";

export default HistoryScreen = (props) => {
    const [listHistory, setListHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dateSelected, setDateSelected] = useState(new Date());

    const onNextMonth = () => {
        const newDate = new Date(dateSelected);
        newDate.setMonth(dateSelected.getMonth() + 1);
        setDateSelected(newDate);
    }

    const onPrevMonth = () => {
        const newDate = new Date(dateSelected);
        newDate.setMonth(dateSelected.getMonth() - 1);
        setDateSelected(newDate);
    }

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const { startDate, endDate } = getStartAndEndOfMonth(dateSelected);
            const result = await apiUtls.getWorkHistory(startDate, endDate);
            const arr = result.reverse().map((item) => {
                return { ...item, title: item.workhistory_description, work_date: getDateString(item.work_date, MM_DD_YYYY), type: 'item', time: getDateString(item.create_at, HH_MM), circleColor: '#26a69a' }
            })
            const obj = groupArrayByKey(arr, 'work_date');
            const list = [];
            for (const [key, value] of Object.entries(obj)) {
                let newObj = {};
                newObj.date = key;
                newObj.listWorkHistory = [
                    {
                        title: `End Activity ${key}`,
                        circleColor: 'red',
                        circleSize: 25,
                        type: 'end',
                        icon: require('../../assets/icons/double-check.png')
                    },
                    ...value,
                    {
                        title: `Start Activity ${key}`,
                        circleSize: 25,
                        circleColor: '#ff9800',
                        type: 'start',
                        icon: require('../../assets/icons/tick.png')
                    }
                ];
                list.push(newObj);
            }
            setListHistory(list);
            setIsLoading(false);
        })();
    }, [dateSelected])

    return (
        <View style={{ height: '100%' }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={onPrevMonth}>
                    <Image
                        source={require('../../assets/icons/left-arrow.png')}
                        style={style.arrow} />
                </TouchableOpacity>
                <Text style={style.log_home_title}>{getDateString(dateSelected, MMM_YYYY)}</Text>
                <TouchableOpacity onPress={onNextMonth}>
                    <Image
                        source={require('../../assets/icons/right-arrow.png')}
                        style={style.arrow} />
                </TouchableOpacity>
            </View>
            {
                listHistory.length > 0 ?
                    <FlatList
                        data={listHistory}
                        renderItem={({ item }) => {
                            return (<Timeline
                                style={{ marginVertical: 10 }}
                                titleStyle={style.timelineTitle}
                                data={item.listWorkHistory}
                                // showTime={false}
                                innerCircle={'dot'}
                                dotSize={5}
                                lineWidth={2}
                                lineColor="#26a29a"
                            />)
                        }}
                    /> :
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={style.styleNoData}>No data in this month</Text>
                    </View>
            }
            {isLoading && <AppLoader />}
        </View>
    )
}