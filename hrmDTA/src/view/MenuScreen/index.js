import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import Styles from '../main-style';
import colors from '../../assets/colors';
import storageUtls from '../../common/storageUtls';
import { useEffect, useState } from 'react';
// import { StackActions, NavigationActions } from 'react-navigation';
import { StackActions, NavigationActions } from '@react-navigation/native';
import { LOGIN_SCREEN } from '../../config/screen';
import AppLoader from '../../components/AppLoader';

const MenuScreen = (props) => {
    const [startData, setStartData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        (async () => {
            const data = await storageUtls.getString(storageUtls.start_data);
            setStartData(JSON.parse(data.toString()))
        })()
    }, [])

    async function onLogout() {
        setIsLoading(true);
        await storageUtls.clearLoginSession();
        setIsLoading(false);
        props.navigation.replace(LOGIN_SCREEN);
    }

    return (
        <ScrollView>
            <View>
                <Text style={Styles.settings_group_title}>Settings information and application</Text>
                <View style={Styles.divider_parent} />
                <View style={Styles.settings_group_container}>
                    <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                        <View style={Styles.settings_item_container}>
                            <Text style={Styles.settings_item_title}>{startData.first_name + ' ' + startData.last_name}</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={Styles.divider_child} />
                    <View>
                            <TouchableHighlight underlayColor={colors.button_clicked}>
                                <View style={Styles.settings_item_container}>
                                    <Text style={Styles.settings_item_title}>{startData.email}</Text>
                                </View>
                            </TouchableHighlight>
                            <View style={Styles.divider_child} />
                            <TouchableHighlight onPress={() => onLogout()} underlayColor={colors.button_clicked}>
                                <View style={Styles.settings_item_container}>
                                    <Text style={{...Styles.settings_item_title, color: '#E53935'}}>Log out</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                </View>
                <View style={Styles.divider_parent} />

                <View style={{ ...Styles.divider_parent, marginTop: 40 }} />
                <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                    <View style={Styles.settings_item_container}>
                        <Text style={Styles.settings_item_title}> Change password</Text>
                    </View>
                </TouchableHighlight>
                <View style={Styles.divider_parent} />
                <View style={{ ...Styles.divider_parent, marginTop: 40 }} />
                <View style={Styles.settings_group_container}>
                    <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                        <View style={Styles.settings_item_container}>
                            <Text style={Styles.settings_item_title}> Privacy of application</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={Styles.divider_child} />
                    <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                        <View style={Styles.settings_item_container}>
                            <Text style={Styles.settings_item_title}> Contact</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={Styles.divider_child} />
                    <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                        <View style={Styles.settings_item_container}>
                            <Text style={Styles.settings_item_title}> About us</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={Styles.divider_parent} />
                {
                    isLoading && <AppLoader/>
                }

            </View>
        </ScrollView>
    );
}

export default MenuScreen;