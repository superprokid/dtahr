import { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native"
import { HOME_SCREEN, LOGIN_SCREEN } from "../../config/screen";
import style from "./style";
import apiUtls from "../../common/apiUtls";

export default Spash = (props) => {

    const { navigation } = props;

    const _navigateScreen = async () => {
        const startData = await apiUtls.getStart();
        if (!startData) {
            navigation.replace(LOGIN_SCREEN);
        } else {
            console.log('startData', startData);
            navigation.replace(HOME_SCREEN);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            _navigateScreen();
        }, 3000)
    }, [])

    return (
        <SafeAreaView style={style.container}>
            <Image
                source={require('../../assets/logo.png')}
                resizeMode='contain'
                style={style.logoImage}
            >
            </Image>
        </SafeAreaView>
    )
}