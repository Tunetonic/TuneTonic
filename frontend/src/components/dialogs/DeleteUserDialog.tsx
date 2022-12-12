import React, { FC } from 'react'
import { Dialog, Paragraph, Button } from 'react-native-paper'
import { StandardDialogProps } from './dialog.type'

const DeleteUserDialog: FC<StandardDialogProps> = ({
  isDialogVisible,
  onDismiss,
  onCancelPress,
  onConfirmPress,
}) => {
  return (
    <Dialog visible={isDialogVisible} onDismiss={onDismiss} dismissable={false}>
      <Dialog.Title>Delete user</Dialog.Title>
      <Dialog.Content>
        <Paragraph>You are about to delete your account.</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onCancelPress}>Cancel</Button>
        <Button onPress={onConfirmPress}>Confirm</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default DeleteUserDialog
