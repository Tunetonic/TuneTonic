import React, { useContext } from 'react'
import { CommonActions } from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'
import {
  Appbar,
  Dialog,
  Paragraph,
  Portal,
  Button,
  Card,
  Switch,
} from 'react-native-paper'
import { authContext } from '../providers/auth.provider'

const Settings = ({ navigation, route }): JSX.Element => {
  const { logout } = useContext(authContext)
  const [visible, setVisible] = React.useState(false)
  const [isSwitchOn, setIsSwitchOn] = React.useState(true)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

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

      <Card
        style={styles.card}
        onPress={() => navigation.navigate('library')}
        mode="outlined"
      >
        <Card.Title
          title="Change genres"
          right={() => (
            <Button
              children={undefined}
              mode="text"
              labelStyle={{ fontSize: 32, color: 'white' }}
              icon="chevron-right"
            ></Button>
          )}
        />
      </Card>
      <Card
        style={styles.card}
        onPress={() => navigation.navigate('library')}
        mode="outlined"
      >
        <Card.Title
          title="Delete account"
          right={() => (
            <Button
              children={undefined}
              mode="text"
              labelStyle={{ fontSize: 32, color: 'white' }}
              icon="chevron-right"
            ></Button>
          )}
        />
      </Card>
      <Card style={styles.card} mode="outlined">
        <Card.Title
          title="Darkmode"
          right={() => (
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          )}
        />
      </Card>
      <Card style={styles.card} onPress={showDialog} mode="outlined">
        <Card.Title
          title={'Logout'}
          right={() => (
            <Button
              children={undefined}
              mode="text"
              labelStyle={{ fontSize: 32, color: 'white' }}
              icon="chevron-right"
            ></Button>
          )}
        />
      </Card>
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

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'black',
  },
})

export default Settings
