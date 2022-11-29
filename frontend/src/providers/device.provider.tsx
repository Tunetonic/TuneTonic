import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import * as Device from 'expo-device'

type DeviceType = 'APPLE' | 'ANDROID'

interface DeviceContextInterface {
  deviceType: DeviceType | null
  osVersion: string | null
}

const defaultValues: DeviceContextInterface = {
  deviceType: null,
  osVersion: null,
}

const deviceContext = createContext<DeviceContextInterface>(defaultValues)

const DeviceProvider = (props: PropsWithChildren) => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(
    defaultValues.deviceType,
  )
  const [osVersion, setOsVersion] = useState<string | null>(
    defaultValues.osVersion,
  )

  useEffect(() => {
    setDeviceType(Device.manufacturer === 'Apple' ? 'APPLE' : 'ANDROID')
    setOsVersion(Device.osVersion)
  }, [])

  return (
    <deviceContext.Provider value={{ deviceType, osVersion }}>
      {props.children}
    </deviceContext.Provider>
  )
}

export { DeviceProvider, deviceContext }
