import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    pageContainer: {
        width: width,
        height: height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    camera: {
        width: width * 1.2,
        height: height * 0.9
    },
    box: (x, y, width, height) => {
        return {
            position: 'absolute',
            top: y,
            left: x,
            height,
            width,
            borderWidth: 2,
            borderColor: 'red'
        }
    },
    checkinModal: {
        position: 'absolute',
        top: 10,
        width: width * 0.8,
        height: height * 0.2,
        backgroundColor: '#ffffff88',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 20
    },
    checkinModalText: {
        fontSize: 20,
        fontWeight: "500"
    },
    checkinButton: {
        backgroundColor: '#1B6D78',
        padding: 10,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    checkinText: {
        color: 'white',
        fontSize: 15,
        fontWeight: "500"
    }
});

export default styles
