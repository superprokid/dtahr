import { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native"
import { HOME_SCREEN, LOGIN_SCREEN } from "../../config/screen";
import style from "./style";
import apiUtls from "../../common/apiUtls";
import storageUtls from "../../common/storageUtls";

export default Spash = (props) => {

    const { navigation } = props;

    const _navigateScreen = async () => {
        const refreshToken = await storageUtls.getString(storageUtls.refresh_token);
        if (refreshToken) {
            apiUtls.getStart().then(result => {
                navigation.replace(HOME_SCREEN);
            }).catch(err => {
                navigation.replace(HOME_SCREEN);
                Alert.alert('Error', 'Network request failed, please check your connection!', [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ], { cancelable: true });
            });
        } else {
            navigation.replace(LOGIN_SCREEN);
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