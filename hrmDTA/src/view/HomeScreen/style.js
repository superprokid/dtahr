import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    bottom_tab: {
        paddingTop: 5,
        paddingBottom: 5,
    },
});

export default styles