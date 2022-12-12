import React, { useContext } from 'react'
import { CommonActions } from '@react-navigation/native'
import { View } from 'react-native'
import {
  Appbar,
  Dialog,
  Paragraph,
  Portal,
  Button,
  Switch,
} from 'react-native-paper'
import { authContext } from '../providers/auth.provider'
import { SettingsItem } from '../components/settings/SettingsItem'
import { themeContext } from '../providers/theme.provider'
import SettingsButton, {
  SettingsButtonProps,
} from '../components/settings/SettingsButton'

const Settings = ({ navigation, route }): JSX.Element => {
  const { logout } = useContext(authContext)
  const [dialogIsvisible, setDialogIsVisible] = React.useState(false)

  const { theme, switchTheme } = useContext(themeContext)

  const showDialog = () => setDialogIsVisible(true)

  const hideDialog = () => setDialogIsVisible(false)

  const handleLogOut = (): void => {
    logout().then(() => {
      setDialogIsVisible(false)
      // reset the complete navigator state.
      navigation
        .getParent()
        .getParent()
        .reset({
          index: 0,
          routes: [{ name: 'login' }],
        })
    })
  }

  const defaultSettingButtonValues: SettingsButtonProps = {
    children: undefined,
    mode: 'text',
    labelStyle: { fontSize: 32, color: 'white' },
    icon: 'chevron-right',
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.dispatch(CommonActions.goBack())
          }}
        />
        <Appbar.Content title={route.name} />
      </Appbar.Header>

      <SettingsItem
        title="Change genres"
        onPress={() => navigation.navigate('Library')}
        cardMode="outlined"
        right={() => <SettingsButton {...defaultSettingButtonValues} />}
      />

      <SettingsItem
        title="Delete account"
        cardMode="outlined"
        onPress={() => undefined}
        right={() => <SettingsButton {...defaultSettingButtonValues} />}
      />

      <SettingsItem
        title="Darkmode"
        onPress={() => undefined}
        right={() => <Switch value={theme.dark} onValueChange={switchTheme} />}
      />

      <SettingsItem
        title="Logout"
        onPress={showDialog}
        cardMode="outlined"
        right={() => <SettingsButton {...defaultSettingButtonValues} />}
      />

      <Portal>
        <Dialog
          visible={dialogIsvisible}
          onDismiss={hideDialog}
          dismissable={false}
        >
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You are about to log out.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleLogOut}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default Settings
