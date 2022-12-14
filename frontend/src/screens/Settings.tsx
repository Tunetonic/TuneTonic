import React, { useContext, useState } from 'react'
import { CommonActions } from '@react-navigation/native'
import { View } from 'react-native'
import { Appbar, Portal, Switch } from 'react-native-paper'
import { authContext } from '../providers/auth.provider'
import { SettingsItem } from '../components/settings/SettingsItem'
import { themeContext } from '../providers/theme.provider'
import SettingsButton, {
  SettingsButtonProps,
} from '../components/settings/SettingsButton'
import { deleteUser } from '../services/user.service'
import LogoutDialog from '../components/dialogs/LogoutDialog'
import DeleteUserDialog from '../components/dialogs/DeleteUserDialog'

const Settings = ({ navigation, route }): JSX.Element => {
  const { user, logout } = useContext(authContext)
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false)
  const [isDeleteAccountDialogVisible, setIsDeleteAccountDialogVisible] =
    useState(false)

  const { theme, switchTheme } = useContext(themeContext)

  const resetNavigationAndRedirect = (): void => {
    // reset the complete navigator state.

    navigation
      .getParent()
      .getParent()
      .reset({
        index: 0,
        routes: [{ name: 'login' }],
      })
  }

  const handleDeleteUser = (): void => {
    if (!user) {
      throw new Error('user is not authenticated!')
    }

    deleteUser(user.id)
      .then(() => {
        logout().then(() => {
          setIsDeleteAccountDialogVisible(false)
          resetNavigationAndRedirect()
        })
      })
      .catch(console.error)
  }

  const handleLogOut = (): void => {
    logout().then(() => {
      setIsLogoutDialogVisible(false)
      resetNavigationAndRedirect()
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
        onPress={() => setIsDeleteAccountDialogVisible(true)}
        right={() => <SettingsButton {...defaultSettingButtonValues} />}
      />

      <SettingsItem
        title="Darkmode"
        onPress={() => undefined}
        right={() => <Switch value={theme.dark} onValueChange={switchTheme} />}
      />

      <SettingsItem
        title="Logout"
        onPress={() => setIsLogoutDialogVisible(true)}
        cardMode="outlined"
        right={() => <SettingsButton {...defaultSettingButtonValues} />}
      />

      <Portal>
        <LogoutDialog
          isDialogVisible={isLogoutDialogVisible}
          onDismiss={() => setIsLogoutDialogVisible(false)}
          onCancelPress={() => setIsLogoutDialogVisible(false)}
          onConfirmPress={handleLogOut}
        />

        <DeleteUserDialog
          isDialogVisible={isDeleteAccountDialogVisible}
          onDismiss={() => setIsDeleteAccountDialogVisible(false)}
          onCancelPress={() => setIsDeleteAccountDialogVisible(false)}
          onConfirmPress={handleDeleteUser}
        />
      </Portal>
    </View>
  )
}

export default Settings
