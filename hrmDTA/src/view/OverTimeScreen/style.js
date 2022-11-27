import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    otRegisterContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },

    titleContainer: {
        marginTop: 8,
        right: 110,
    },
    buttonChangeContainer: {  
        backgroundColor: '#1B6D78',
        padding: 5,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: 310,
        height: height * 0.08,
        backgroundColor: 'gainsboro',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    textChange: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    textInBtnChange: {
        position: 'absolute',
        top: 5,
        left: 4
    },
    textInTimes: {
        position: 'absolute',
        top: 15,
        left: 10
    },
    containerBtnDate: {
        position: 'absolute',
        top: 12,
        right: 65,
        width: 40,
        height: 30,
        backgroundColor: "aquamarine",
        borderRadius: 8
    },
    containerBtnTime: {
        backgroundColor: "lavenderblush",
        borderRadius: 8,
        position: 'absolute',
        top: 12,
        right: 10,
        width: 40,
        height: 30,
    },
    textReason: {
        height: 150,
        width: 310,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        textAlignVertical: "top"
    },
    resgisterBtn: {
        marginTop: 7,
        backgroundColor: "lawngreen",
        borderRadius: 8,
        width: 80,
        height: 30
    },
    otRegisterContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    otTickerCard: {
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
    otTicketInfo: {
        flex: 0.65,
        justifyContent: 'space-between'
    },
    otTicketAction: {
        flex: 0.35,
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    otTickerTitle: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    otTickerRegistedText: {
        fontSize: 12,
        fontWeight: '400'
    },
    otTicketStatus: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: 'white'
    },
    otPaymentText: {
        color: '#C26041',
        fontWeight: '500'
    }
});

export default styles