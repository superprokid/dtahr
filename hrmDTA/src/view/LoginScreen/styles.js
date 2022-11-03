import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1,
        maxHeight: '70%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30
    },
    logoImage: {
        maxWidth: '40%',
        height: '30%'
    }
})

export default style