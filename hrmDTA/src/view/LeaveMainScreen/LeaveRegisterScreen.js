import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import DropDown from "../../components/DropDown";
import PrimaryInput from "../../components/PrimaryInput";
import styles from "./style";

const LeaveRegisterScreen = (props) => {
    const navigation = props.navigation;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('on focus', 'LEAVE_REGISTER_TAB')
        });

        return unsubscribe;
    }, [navigation]);

    
    const [type, setType] = useState(null);
    const [items, setItems] = useState([
        { label: 'OFF', value: 0 },
        { label: 'LATE', value: 1 }
    ]);

    return (
        <View style={styles.leaveRegisterContainer}>
            <DropDown
                label='Leave Type'
                required={true}
                items={items}
                value={type}
                setValue={setType}
                setItems={setItems}/>
        </View>
    )
}

export default LeaveRegisterScreen;