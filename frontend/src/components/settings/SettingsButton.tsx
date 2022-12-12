import React, { FC, ReactNode } from 'react'
import { Button } from 'react-native-paper'

export interface SettingsButtonProps {
  children: ReactNode
  mode?: 'text' | 'outlined' | 'contained' | undefined
  labelStyle: { fontSize: number; color: string }
  icon: string
}

const SettingsButton: FC<SettingsButtonProps> = (props) => {
  return <Button {...props}></Button>
}

export default SettingsButton
