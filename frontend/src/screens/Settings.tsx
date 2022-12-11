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
import { SettingsItem } from '../components/SettingsItem'
import { themeContext } from '../providers/theme.provider'

const Settings = ({ navigation, route }): JSX.Element => {
  const { logout } = useContext(authContext)
  const [visible, setVisible] = React.useState(false)
  const [isSwitchOn, setIsSwitchOn] = React.useState(true)

  const onToggleSwitch = () => setIsSwitchOn(prev => !prev)

  const { theme, switchTheme } = useContext(themeContext)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const handleLogOut = (): void => {
    logout().then(() => {
      setVisible(false)
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
        onPress={() => navigation.navigate('library')}
        cardMode="outlined"
        right={() => (
          <Button
            children={undefined}
            mode="text"
            labelStyle={{ fontSize: 32, color: 'white' }}
            icon="chevron-right"
          ></Button>
        )}
      />

      <SettingsItem
        title="Delete account"
        cardMode="outlined"
        onPress={() => undefined}
        right={() => (
          <Button
            children={undefined}
            mode="text"
            labelStyle={{ fontSize: 32, color: 'white' }}
            icon="chevron-right"
          ></Button>
        )}
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
        right={() => (
          <Button
            children={undefined}
            mode="text"
            labelStyle={{ fontSize: 32, color: 'white' }}
            icon="chevron-right"
          ></Button>
        )}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} dismissable={false}>
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
