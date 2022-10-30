import { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native"
import { LOGIN_SCREEN } from "../../config/screen";
import style from "./style";
import storageUtls from "../../common/storageUtls";

export default Spash = (props) => {

    const { navigation } = props;

    const _navigateScreen = () => {
        navigation.replace(LOGIN_SCREEN);
    }

    useEffect(() => {
        (async () => {
            setTimeout(() => {
                _navigateScreen();
            }, 3000)
        })()
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