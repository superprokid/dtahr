import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    leaveRegisterContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center'
    }
});

export default styles