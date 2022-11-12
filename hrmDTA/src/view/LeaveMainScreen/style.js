import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    leaveRegisterContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    leaveTickerCard: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',
        padding: 5,
        flex: 1,
        flexDirection: "row",
        maxHeight: 130,
        marginVertical: 5
    },
    leaveTicketInfo: {
        flex: 0.8,
        justifyContent: 'space-between'
    },
    leaveTicketAction: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leaveTickerTitle: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    leaveTickerRegistedText: {
        fontSize: 12,
        fontWeight: '400'
    },
    leaveTicketStatus: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: 'white'
    }

});

export default styles