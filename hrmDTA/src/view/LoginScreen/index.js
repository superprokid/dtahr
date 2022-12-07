import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";

import { Alert, Image, Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import mainStyle from "../main-style";
import style from "./styles"
import AppLoader from "../../components/AppLoader";
import { useState } from "react";
import apiUtls from "../../common/apiUtls";
import storageUtls from "../../common/storageUtls";
import { HOME_SCREEN } from "../../config/screen";

export default LoginScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { navigation } = props;

    const onLogin = () => {
        Keyboard.dismiss();
        if (email.length == 0 || password.length < 6) {
            Alert.alert('Inform', "Your email or password is invalid", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                apiUtls.login({
                    email,
                    password
                }).then((result) => {
                    if (result.failed) {
                        Alert.alert('Error', result.message || 'Login failed, please check your email and password', [
                            {
                                text: 'OK',
                                style: 'cancel'
                            }
                        ], { cancelable: true });
                    } else {
                        storageUtls.setString(storageUtls.access_token, result.accessToken || null);
                        storageUtls.setString(storageUtls.refresh_token, result.refreshToken || null);
                        navigation.replace(HOME_SCREEN);
                    }
                }).catch((err) => {
                    Alert.alert('Error', 'Something went wrong, please try later', [
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ], { cancelable: true });
                })
            }, 1500)
        }
    }

    return (
        <View style={style.container}>
            <View style={style.inputContainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    resizeMode='contain'
                    style={style.logoImage}
                />
                <PrimaryInput
                    label='User name'
                    required={true}
                    placeholder='Enter your user name'
                    onChangeText={(text) => {
                        setEmail(text)
                    }} />
                <PrimaryInput
                    label='Password'
                    required={true}
                    placeholder='Enter your password'
                    isPassword={true}
                    onChangeText={(text) => {
                        setPassword(text)
                    }} />
                <Text style={mainStyle.primary_button_text}>Fogot your password</Text>
            </View>
            <PrimaryButton type='primary' title='Log in' onPress={onLogin} />
            {isLoading && <AppLoader />}
        </View>
    )
}