import React, { FC } from 'react'
import { Button, Dialog, Paragraph } from 'react-native-paper'
import { StandardDialogProps } from './dialog.type'

const LogoutDialog: FC<StandardDialogProps> = ({
  isDialogVisible,
  onDismiss,
  onCancelPress,
  onConfirmPress,
}) => {
  return (
    <Dialog visible={isDialogVisible} onDismiss={onDismiss} dismissable={false}>
      <Dialog.Title>Logout</Dialog.Title>
      <Dialog.Content>
        <Paragraph>You are about to log out.</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onCancelPress}>Cancel</Button>
        <Button onPress={onConfirmPress}>Confirm</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default LogoutDialog
