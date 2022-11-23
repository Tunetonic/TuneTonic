import { CommonActions, StackActions } from "@react-navigation/native";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { View } from "react-native";

import { Appbar, Dialog, Paragraph, Portal, Button } from "react-native-paper";
import { LoginContext } from "../Context";

const Settings = ({navigation, route}): JSX.Element => {

    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    let setIsSignedIn = useContext(LoginContext);
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const logOut = (): void => {
        removeCookie('loginCookie');
        setIsSignedIn = false;
        setVisible(false);
        // reset the complete navigator state.
        navigation.getParent().getParent().reset({
            index: 0,
            routes: [{name: 'login'}]
        })
    }

    
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigation.dispatch(CommonActions.goBack());}} />
                <Appbar.Content title={route.name}/>
            </Appbar.Header>

            <Button mode="contained" onPress={showDialog}>Logout</Button>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
                    <Dialog.Title>Logout</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>You are about to log out.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={() => logOut()}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}
export default Settings;
