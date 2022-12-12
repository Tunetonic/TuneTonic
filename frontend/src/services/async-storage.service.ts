import * as SecureStore from 'expo-secure-store'

export const setAsyncItem = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (error) {
    console.error(error)
  }
}

export const getAsyncItem = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const removeAsyncItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.error(error)
  }
}
